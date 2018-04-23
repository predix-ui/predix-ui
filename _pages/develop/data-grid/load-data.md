---
title: "Data Grid: Load Data"
layout: default
moduleName: view-develop-data-grid-load-data
pathToRoot: ../../../
---

The data grid renders an array of objects in rows. Apps can decide when and how to load that data using the `tableData` and `remoteDataProvider` APIs.

# Structure data

Each row in the grid should be represented as a JavaScript object. The object’s keys will become the grid columns. The object’s values will be rendered as grid cells.

The structure of each object can be flexible depending on the use case. Objects can contain extra data that will not be rendered by the grid. See the “Define custom columns” section below for information on showing and hiding columns.

### Example: Inspection audit app

Plant operators can load a list of the turbines in their facility and review the last inspection date for each turbine. Turbine records are stored in table in the app’s NoSQL-style database. The following JSON is a single record stored in the database:

```json
{
  "id": "1A344",
  "type": "turbine",
  "floor": "1",
  "section": "A",
  "lastInspection": "2018-01-13 08:21:00"
}
```

The app backend exposes an API endpoint that returns a list of turbines as JSON:

```json
[
  { "id" : "1A344", ... },
  { "id" : "1A345", ... },
  { "id" : "1A346", ... }
]
```

The turbine list is fetched from the API and passed to the data grid. The grid will display 3 rows (one for each turbine) and 5 columns (one for each key in the turbine record):

<catalog-picture
  img-src="../../img/developer-guides/data-grid/load-data-inspection-audit"
  img-alt="Data grid displaying 3 rows, one for each turbine, and 5 columns, one for each key in the turbine record">
</catalog-picture>

# Load local data

Load data in your app, format it as an array of objects, and set it to the data grid’s `tableData` property to render it.

This approach is known as a “local” data source. Local refers to your app loading and updating the data from a data source, like a backend API or static files hosted on a CDN. Your app will likely use AJAX to make calls to a REST API for some data in JSON format, parse the data, and give it to the grid. This is the simplest way to start displaying data and covers most use cases. See the “Advanced: Remote data provider” section below for a different approach.

### Example: User management app

An administrator needs to load a list of users to verify their names and email addresses are correct. The app backend exposes an API endpoint that returns the list of users as JSON:

```json
[
  { "name": "Ada Lovelace", "email": "ada@example.com" },
  { "name": "Grace Hopper", "email": "grace@example.com" },
  { "name": "Mae Jemison", "email": "mae@example.com" },
  { "name": "Sally Ride", "email": "sally@example.com" }
]
```

The app frontend fetches the user list and sets the data grid `tableData` property:

```javascript
// `fetchUserData()` returns a promise that resolves with
// the user list JSON data parsed into an array of objects
fetchUserData().then(data => {
  const grid = document.querySelector('px-data-grid');
  grid.tableData = data;
});
```

The grid will display 4 rows, one for each user:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/load-data-user-management"
  img-alt="Data grid displaying 4 rows, one for each user">
</catalog-picture>

# Update, add, replace local data

Apps using the local data source approach can update the `tableData` property at any time to add new records, update existing records, or replace the data completely with a new set of data. Its recommended that `tableData` is copied to a new array reference after it is updated to ensure the grid refreshes its data.

```javascript
function addRowToGrid() {
  const grid = this.querySelector('px-data-grid');
  /* The ES6 spread operator `...` creates a new array reference */
  grid.tableData = [...grid.tableData, { /* new row data here */ }];
};
```

# Load remote data

The data grid can load data on demand from a “remote” data source like a backend API using the `remoteDataProvider` property. The grid loads data lazily, requesting new records when the user scrolls past all the loaded data and hits the end of the table. This is a powerful feature that can be used to load large amounts of data from a remote source on demand, increasing performance on the front-end and reducing stress on backend services.

See the [remote data provider](https://github.com/predixdesignsystem/px-data-grid/blob/9c4819aab9416ebd6f64b3864ee52c43ccf61696/demo/px-data-grid-remote-data-provider-demo.html#L151-L189) demo page source code for an example of how to use this feature.

**Note:** The local and remote data source APIs cannot be used together. Your app should use the `tableData` API for local data or `remoteDataProvider` API for remote data, but not both.
