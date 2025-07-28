# KY Highway Projects Dashboard

An interactive, open-source web dashboard for visualizing Kentucky highway project data, featuring advanced filtering, mapping, and data export capabilities. This project is designed for educational and portfolio purposes and is not officially endorsed by the Kentucky Transportation Cabinet (KYTC).

---

## Table of Contents

- [KY Highway Projects Dashboard](#ky-highway-projects-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Architecture \& Technologies](#architecture--technologies)
  - [Data Sources](#data-sources)
  - [Filtering System](#filtering-system)
    - [District Filter](#district-filter)
    - [County Filter](#county-filter)
    - [Project Type Filter](#project-type-filter)
    - [Dynamic Titles](#dynamic-titles)
    - [Dynamic Route Information](#dynamic-route-information)
  - [Usage Guide](#usage-guide)
  - [File Structure](#file-structure)
  - [Disclaimer](#disclaimer)
  - [Help \& Support](#help--support)
  - [License](#license)

---

## Project Overview

The KY Highway Projects Dashboard is a modern, device-responsive web application for exploring current and awarded highway construction projects in Kentucky. It leverages open data, interactive mapping, and dynamic data visualization to provide the public, contractors, and government stakeholders with intuitive access to authoritative project data. The dashboard is built with open web technologies and does not rely on proprietary Esri tools.

**Purpose:**
- Enable transparent, public access to Kentucky's highway project data
- Provide interactive tools for filtering, mapping, and analyzing project information
- Serve as a demonstration of GIS web development, data visualization, and modular JavaScript architecture

**Educational/Portfolio Project:**
This dashboard was developed independently by the author as a learning and demonstration project. See [Disclaimer](#disclaimer) for details.

---

## Features

- **Interactive Map:**
  - Explore highway projects using a Leaflet.js map with multiple basemap options
  - Click on project lines to view detailed project information in popups
  - Zoom and pan to areas of interest
- **Multi-Level Filtering:**
  - Filter projects by KYTC district, county, and standardized project type
  - Search-enabled dropdowns for quick selection
  - Filters can be combined for granular data exploration
- **Dynamic Data Visualization:**
  - Pie chart showing awarded vs. current projects
  - Horizontal bar chart displaying project distribution by year
  - Charts update automatically based on active filters
- **Advanced Data Table:**
  - Sortable, filterable, and paginated table of project details
  - Export data as CSV, JSON, or Excel (XLSX)
- **Basemap Switching:**
  - Choose from OpenStreetMap, Esri World Street Map, USGS Topo, and OpenTopoMap tiles through Leaflet fetch process
- **Clear All Filters:**
  - One-click button to reset all filters and restore the default view
- **Responsive Design:**
  - Optimized for desktop and mobile devices
- **API Integration:**
  - Integrates with the KYTC Spatial API for route-specific data (see map controls)
- **Accessible Help & Disclaimer:**
  - [Help page](help.html) and [Disclaimer](disclaimer.html) included in the project

---

## Architecture & Technologies

**Frontend:**
- HTML5, CSS3 (with Bootstrap 5), JavaScript (ES6+)
- Responsive layout and modular UI components

**Mapping & Visualization:**
- [Leaflet.js](https://leafletjs.com/) for interactive mapping
- [Chart.js](https://www.chartjs.org/) for charts
- [Tabulator.js](http://tabulator.info/) for advanced data tables

**Data Management:**
- [SQL.js](https://sql.js.org/) for client-side SQLite database operations
- GeoJSON for spatial data layers (projects, counties, districts)

**Other Tools:**
- [SheetJS](https://sheetjs.com/) for Excel export
- Node.js/Express for backend data refresh (optional, see `server.js`)

---

## Data Sources

All data used in this dashboard is sourced from **publicly available datasets** provided by the Kentucky Transportation Cabinet (KYTC) and other open government data repositories. No proprietary or confidential information is used.

**Key Data Files:**
- `data/Current_Highway_Plans.geojson` — Current highway project lines
- `data/Awarded_Highway_Plans.geojson` — Awarded project lines
- `data/KY_Counties.geojson` — County boundaries
- `data/KYTC_Districts.geojson` — District boundaries
- `data/HighwayPlan_data.db` — SQLite database with project tables and views

**Official KYTC Resources:**
- [KYTC Website](https://transportation.ky.gov)
- [KYTC Open Data Portal](https://data.ky.gov)

---

## Filtering System

The dashboard provides three levels of filtering, which are currently used independently.  It is a future enhancement to apply their in combinations:

### District Filter
- Filter by KYTC districts (1-12)
- Automatically zooms to district boundaries
- Updates all charts and tables to show district-specific data

### County Filter
- Search-enabled dropdown with all Kentucky counties
- Type to search for specific counties
- Zooms to county boundaries when selected

### Project Type Filter
- Intelligent categorization using a crosswalk database
- Maps raw project types to standardized categories
- Search functionality to quickly find project types
- Visual indicator shows active filter

### Dynamic Titles
- Panel titles automatically update to reflect active filters
- Examples:
  - "Projects in District 2"
  - "Projects in Fayette County"
  - "Projects in District 7 in Fayette County (Bridge Construction)"
- Clear visual feedback about what data is being displayed

### Dynamic Route Information
- Search for route information by selecting a specific project geograhic feature
  - Zoom into the map by double-clicking or using the zoom and pan
  - Select a desired route
  - Send the API call
  - Data is returned and can be copied or printed for later use.

---

## Usage Guide

1. **Open the dashboard** in a web browser (see `index.html`)
2. While the database should load on page initiation, there is also a **"Load Database"** button to load the highway project data, if needed.
3. Change BaseMap options
   - allows the use to select one of four pre-selected basemaps for map display.
4. Use the filter controls in the top-right side:
   - **Clear All** (CLR button): Reset all active filters at once
   - **County Filter** (house icon): Search and filter by county name
   - **District Filter** (map icon): Filter by KYTC district (1-12)
   -  **Project Type Filter** (road icon): Filter by standardized project categories
   -  **Search for Route Information** (road )
5. **Panel titles automatically update** to show active filters (e.g., "Projects in District 7")
6. **Click on highway project lines** (colored lines on map) to view detailed project information in a popup (this is a work-in-progress)
7. Use the table's built-in sorting and filtering capabilities
8. **Export data** using the CSV, JSON, or Excel buttons
9.  **Switch basemaps** using the map control in the top-right corner
10. **Charts and data** automatically update based on selected filters
11. For more details, see the [Help page](help.html)

---

## File Structure

```text
├── css/
│   ├── style.css             # Custom dashboard styling
│   └── auxillary.css         # Additional styles for help/disclaimer
├── data/
│   ├── *.geojson             # GeoJSON files for map layers
│   ├── HighwayPlan_data.db   # SQLite database with project data
│   ├── *.csv                 # Tabular data for import
│   └── downloads/            # Downloaded data files
├── images/                   # Reference images, icons, and wireframes
├── js/
│   ├── download.js           # Data download logic
│   ├── script.js             # Main application logic
│   └── updateProjectsRoute.js # Node.js Express route handler
├── References/               # Supporting documentation
│   └── CapstoneProjectPlan.pdf
├── download-geojson.js       # Node.js script for GeoJSON downloads
├── download.html             # Data refresh options page
├── help.html                 # User help page
├── disclaimer.html           # Project disclaimer page
├── index.html                # Main dashboard page
├── package.json              # Node.js project metadata and dependencies
├── package-lock.json         # Exact versions of installed dependencies
├── README.md                 # Project overview and documentation
├── requirements.txt          # (Legacy) Python/Node.js requirements
├── server.js                 # Node.js web server (optional)
```

---

## Disclaimer

This dashboard is an **independent software development project** created by the developer in their personal capacity. It is **not commissioned, directed, or endorsed** by the Kentucky Transportation Cabinet (KYTC) or any of its departments. All data is sourced from **publicly available datasets**. For official information, visit the [KYTC website](https://transportation.ky.gov).

See the full [Disclaimer](disclaimer.html) for details on data sources, liability, and project purpose.

---

## Help & Support

For usage instructions, see the [Help page](help.html).

For questions about this independent project, contact the developer directly. For official KYTC highway project information, contact the Kentucky Transportation Cabinet through their official channels.

---

## License

This project is for educational and demonstration purposes only. No warranty is provided.
