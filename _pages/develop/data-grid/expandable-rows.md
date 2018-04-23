---
title: "Data Grid: Expandable Rows"
layout: default
moduleName: view-develop-data-grid-expandable-rows
pathToRoot: ../../../
---

# Show more information about a row

Records are displayed as rows in the data grid. Each row can display a variety of information to the user, including strings, dates, numbers, or dynamic UI pieces created with custom renderers. But each piece of data must fit into a relatively small cell, and some data is hard to show at a small size. The row details template allows apps to display additional data about a row in an expandable/collapsible box shown below each row that is as wide as the table and as tall as the developer wants.

When the row details template is used, each row in the data grid can be expanded by the user to show more in-depth information in a larger format:

<img class="gif" src="../../img/developer-guides/data-grid/expandable-rows-map.gif"/>

# Create a row details template

Pass a `<template>` tag with the class `row-details` into the data grid tag to enable row details mode:

```html
<px-data-grid tableData="...">
  <template class="row-details">
    <!-- Row details template -->
  </template>
</px-data-grid>
```

The grid will search for the template tag when its children are distributed. If it finds the template tag, it will automatically enable row details mode and show chevron icons to the left side of each row:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/expandable-rows-chevron"
  img-alt="A data grid with delivery data records. Beside each row is a chevron indicating the user can expand the row.">
</catalog-picture>

When the user clicks on the chevron icon next to the row the grid stamps a new instance of the row details template and passes in the row’s table data object as `item` in the template. The template should use [Polymer’s data-binding syntax](https://www.polymer-project.org/2.0/docs/devguide/data-binding#bind-to-text-content) to render row data.

### Example: User profile app

An administrator needs to review a list of users with access to their application and make sure everyone has the right permissions. The admin wants to see the user’s profile photo and some information on data the user has accessed to determine if the user has the right permissions.

The app loads user records as JSON:

```json
[
  {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "photoUrl": "/photos/lovelace.jpg",
    "accessLog": [ "View asset #0498", "Edit asset #1102" ]
  },
  {
    "name": "Grace Hopper",
    "email": "grace@example.com",
    "photoUrl": "/photos/hopper.jpg",
    "accessLog": [ "View asset #1244", "View asset #1245" ]
  },
  {
    "name": "Mae Jemison",
    "email": "mae@example.com",
    "photoUrl": "/photos/jemison.jpg",
    "accessLog": [ "Copy asset #0001 to #5801", "Delete asset #5801" ]
  }
]
```

The app passes a row details template that takes the user table data object and shows the user’s name, profile photo, and a list of access log entries:

```html
<px-data-grid tableData="...">
  <template class="row-details">
    <style>
      /* CSS must be defined inside the template */
      img {
        width: 100px;
        height: 100px;
      }

    </style>
    <img src$="[[item.photoUrl]]" />
    <p>[[item.name]]</p>
    <ul>
      <template is="dom-if" items="[[item.accessLog]]" as="entry">
        <li>[[entry]]</li>
      </template>
    </ul>
  </template>
</px-data-grid>
```

When the user expands one of the rows, the row details template will be stamped out with the user data in that row:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/expandable-rows-ada-record"
  img-alt="The Ada Lovelace row is expanded, and the template data has been interpolated and turned into strings about Ada Lovelace">
</catalog-picture>

# Don’t combine with other expand/collapse

The grid uses the expand/collapse row interaction pattern for the group by column feature. Apps cannot combine group by column module and row details mode. If a row details template is passed into the grid, the group by column option will be hidden from the column action menu.
