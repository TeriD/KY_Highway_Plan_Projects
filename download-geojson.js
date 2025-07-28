// download-geojson.js
// This script is a Node.js script that downloads GeoJSON files from specified URLs.
// It is not a client-side JavaScript.
// It is intended to be run on the server side, typically triggered by a request from a
// client-side application or manually via command line.
const https = require('https');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');

const layers = [
  {
    url: 'https://maps.kytc.ky.gov/arcgis/rest/services/Apps/ActiveHighwayPlan_Ext_Prd/MapServer/0/query?where=1=1&outFields=*&f=geojson',
    filename: 'Awarded_Highway_Plans.geojson' // Active_Highway_Plan.geojson
  },
  {
    url: 'https://maps.kytc.ky.gov/arcgis/rest/services/Apps/ActiveHighwayPlan_Ext_Prd/MapServer/1/query?where=1=1&outFields=*&f=geojson',
    filename: 'Current_Highway_Plans.geojson' // Current_Highway_Plan.geojson
  },
  {
    url: "https://storage.googleapis.com/kytc-trak/data_hub_csv/eda_current_enact_plan_data_set.csv",
      filename: "Current_Enact_Plan_Data_Set.csv" // Current_Enact_Plan_Data_Set.csv
  }
];

// Define the output directory
const outDir = path.join(__dirname, 'data');
fs.mkdirSync(outDir, { recursive: true });


async function downloadGeojsonFiles() {
  for (const layer of layers) {
    const outFile = path.join(outDir, layer.filename);
    await new Promise((resolve) => {
      https.get(layer.url, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Failed to download ${layer.filename}:`, res.statusCode);
          res.resume();
          return resolve();
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          fs.writeFileSync(outFile, data);
          console.log(`${layer.filename} downloaded and saved to`, outFile);
          resolve();
        });
      }).on('error', (e) => {
        console.error(`Error downloading ${layer.filename}:`, e.message);
        resolve();
      });
    });
  }
}

async function updateProjectsTable() {
  // Path to DB and CSV
  const DB_PATH = path.join(__dirname, 'data', 'HighwayPlan_data.db');
  // Accept both possible capitalizations for the CSV file
  let CSV_PATH = path.join(__dirname, 'data', 'downloads', 'Current_Enact_Plan_Data_Set.csv');
  if (!fs.existsSync(CSV_PATH)) {
    // Try alternate name
    CSV_PATH = path.join(__dirname, 'data', 'downloads', 'eda_current_enact_plan_data_set.csv');
  }
  if (!fs.existsSync(CSV_PATH)) {
    console.error('CSV file not found:', CSV_PATH);
    return;
  }
  console.log('Updating projects table from', CSV_PATH);
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Failed to open DB:', err);
      return;
    }
  });
  // Truncate table
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM projects', function(err) {
      if (err) {
        console.error('Failed to truncate table:', err);
        reject(err);
      } else {
        console.log('Table truncated');
        resolve();
      }
    });
  });
  // Read CSV and insert rows
  const insertPromises = [];
  const columns = [];
  let firstRow = true;
  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        if (firstRow) {
          for (const col in row) columns.push(col);
          firstRow = false;
          console.log('CSV columns:', columns);
        }
        const placeholders = columns.map(() => '?').join(',');
        const sql = `INSERT INTO projects (${columns.join(',')}) VALUES (${placeholders})`;
        const values = columns.map(col => row[col]);
        insertPromises.push(new Promise((res2, rej2) => {
          db.run(sql, values, function(err) {
            if (err) {
              console.error('Insert error:', err, 'Row:', row);
              rej2(err);
            } else res2();
          });
        }));
      })
      .on('end', () => {
        console.log('CSV read complete');
        resolve();
      })
      .on('error', (err) => {
        console.error('CSV read error:', err);
        reject(err);
      });
  });
  await Promise.all(insertPromises);
  db.close((err) => {
    if (err) console.error('Error closing DB:', err);
    else console.log('DB closed');
  });
  console.log('Projects table update complete.');
}

(async () => {
  await downloadGeojsonFiles();
  await updateProjectsTable();
})();
