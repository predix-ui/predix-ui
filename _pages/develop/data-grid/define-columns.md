---
title: "Data Grid: Define Columns"
layout: default
moduleName: view-develop-data-grid-define-columns
pathToRoot: ../../../
---

The grid uses columns to decide how to render its data. Apps can use the `columns` property to show or hide certain columns, define how users can interact with columns, and change the way each column’s cells are rendered.

# Use auto-generated columns

If data is added to the grid before the `columns` property is defined the grid will automatically generate a set of columns. The first data object will be scanned, and each of its keys will be turned into a new column. The column name displayed in the grid header will be set to the key. All columns are treated as strings by default.

This approach works for simple use cases where the app formats and cleans the data before adding it to the grid. But relying on the grid to generate columns can lead to some unexpected outcomes:

* Only the first object is scanned to generate the columns. If additional keys are defined on other objects but not the first one those keys will not be turned into columns, and the related data won’t be rendered in the grid.
* Column names are copied exactly from the first object’s keys. If your keys aren’t human readable or use camelCase syntax the grid headers will be hard to read.
* All keys found on the first object will be turned into columns and rendered. If your data includes computed values only used for rendering your UI or non-human-readable values like database IDs you may not want to clutter the grid with that information. Creating custom columns is the only way to control what data is rendered by default.

# Define custom columns

Set the `columns` property on the grid to an array of objects to control which columns are shown and how users can interact with those columns. The grid will ignore data that is not explicitly referenced by one of the columns, allowing apps to control what data is shown to the user.

There are many options that can be set for each column. The most basic column definition should include name and path:

* `{string} name` - Name to display at the top of the grid above the column. If none is given the column header will be blank.
* `{string} path` - The key to use to get the values for each cell in the column from the grid data objects

See the px-data-grid API documentation for a full list of options.

### Example: First and last names

The following is a simple `columns` definition that will show the first name and last name for a list of people in a grid:

```javascript
[
  {
    name: 'First Name',
    path: 'first'
  },
  {
    name: 'Last Name',
    path: 'last'
  }
]
```

The grid data should use the same paths defined for each column:

```json
[
  { "first": "Ada",   "last": "Lovelace", "id": 0 },
  { "first": "Grace", "last": "Hopper",   "id": 1 },
  { "first": "Mae",   "last": "Jemison",  "id": 2 },
  { "first": "Sally", "last": " Ride",    "id": 3 }
]
```

The grid will only display the columns that were defined, rendering the first and last name for each person but ignoring the `id` field:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/define-columns-first-last-names"
  img-alt="Data grid cells showing first and last names for each person but hiding the ID field">
</catalog-picture>

# Hide, show, freeze, and size columns

Some datasets call for more advanced styling for each column. Hiding and showing columns can help the user focus on information that is important to the current task. Freezing a column locks it to the left of the grid and can help reduce tedious horizontal scrolling when the user frequently refers to the first few columns. Setting custom sizes for columns ensures space in the grid is used appropriately and cells with large amounts of data aren’t unnecessarily truncated.

Uses can hide and freeze columns by clicking on the three-dot button that appears when hovering over a header cell. Users can unhide columns by clicking on the table action menu at the top right of the grid.

The following options can be set in column definitions to control the way columns are rendered:

* `{boolean} hidden=false` - Hidden columns aren’t shown on the grid, but can be shown later. Set to `true` to hide the column. Set to `false` to hide the column. Defaults to false.
* `{boolean} frozen=false` - Frozen columns are fixed at the beginning of the grid and don’t move when the user scrolls horizontally. Set to `true` to freeze the column. Set to `false` to unfreeze the column. Defaults to false.
* `{number} flexGrow=1` - Columns with larger flex grow values are given more horizontal space in the grid. Increase the flex grow value for columns to make them larger and reduce cell truncation or wasted space. All columns default to `1`.  This value works like the CSS `flex-grow` rule.

See the px-data-grid API documentation for a full list of options.

### Example: Delivery tracking app

Dispatchers can review a list of parts out for delivery to customers today. Each delivery record includes a unique Delivery Code that is given to the customer when they make the order. When customers call in to get an updated delivery time for their order, the dispatcher must find the row containing the correct Delivery Code and find the estimated delivery time and location of the driver.

Delivery records contain a lot of information:

```json
{
  "deliveryCode": "AA-08947-D",
  "estimatedArrival": "2018-02-04 11:30:00",
  "driverLocation": "Concord, CA",
  "customer" : "Acme Widgets, Inc.",
  "customerAddress": "555 Main Street, Suite 398-A, Walnut Creek, CA 94440",
  "customerContact": "Alexander C",
  "customerPhone": "555-222-3040",
  "partNumber": "CRANK_9938_D03",
  "weight": 104,
  "id": "00001293"
}
```

The dispatcher cares about the delivery code the most. It’s the identifier they rely on to ensure they’re giving the customer the right information. The app freezes the column so it is always visible.

Some information, like the customer contact name, phone number, and internal record ID isn’t usually needed to answer questions from callers. The app hides these columns by default, and lets the dispatchers decide when to show the information.

The address is usually long and is hard to read when it is truncated or broken across many lines. The app gives the address field more horizontal space than the rest of the columns.

The column definition for this grid is more complex but helps the user do their job with speed and precision:

```javascript
[
  {
    name: 'Delivery Code',
    path: 'deliveryCode',
    frozen: true
  },
  {
    name: 'ETA',
    path: 'estimatedArrival'
  },
  {
    name: 'Driver Location',
    path: 'driverLocation'
  },
  {
    name: 'Customer Company',
    path: 'customer'
  },
  {
    name: 'Customer Address',
    path: 'customerAddress',
    flexGrow: 2
  },
  {
    name: 'Customer Contact',
    path: 'customerContact',
    hidden: true
  },
  {
    name: 'Customer Phone #',
    path: 'customerPhone',
    hidden: true
  },
  {
    name: 'Part #',
    path: 'partNumber'
  },
  {
    name: 'Part Weight',
    path: 'weight'
  },
  {
    name: 'Internal ID',
    path: 'id',
    hidden: true
  }
]
```

The app uses these `columns` and sets the grid’s `tableData` property to the sample record. The resulting grid shows the delivery code all the time, even when the user scrolls horizontally, and hides the customer contact, customer phone number, and internal ID:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/define-columns-delivery-tracking"
  img-alt="Data grid cells showing the delivery code all the time, even when the user scrolls horizontally, and hiding the customer contact, customer phone number, and internal ID">
</catalog-picture>

The user can show those columns if they’re needed later using the Actions button:

<img class="gif" src="../../img/developer-guides/data-grid/cell-renderers-show-column-action.gif"/>

# Change cell renderers

Columns decide how their cells should be displayed to the user by defining renderers. The data grid comes with a few built-in renderers, and all columns use the string renderer by default. Read the “Cell renderers” guide for more information on using different default renderers or defining custom renderers.

# Additional column configurations

See the px-data-grid API documentation for a full list of configuration options for columns.
