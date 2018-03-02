---
title: "Data Grid: Cell Renderers"
layout: default
moduleName: view-develop-data-grid-cell-renderers
pathToRoot: ../../../
---

*This guide is under development. Check back for updates.*

The grid uses cell renderers to format and display data. Apps can choose from a set of built-in renderers or use custom renderers to create powerful new ways to display information.

# Introduction

By default the grid treats all of its data as a string, printing out each cell’s value directly without any custom formatting. This makes sense for simple data like names, identifiers, or simple values. But complex data may call for custom styling or formatting to make it easier for the user to scan and digest information.

For example, cells containing time series data could use a spark line chart to visualize the values instead of printing them out as a list of numbers:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/cell-renderers-introduction"
  img-alt="Data grid cell showing a spark line chart using a custom renderer">
</catalog-picture>

Custom renders are tiny web components, just like px-data-grid and the rest of the Predix Design System components. They can display data in simple read-only formats or in complex interactive formats. Custom renderers can also be used to present new UIs for editing cell data when the grid enters editable mode.

# Use built-in renderers

The data grid ships with three built-in renderers: a string renderer, number renderer, and date renderer. Use the grid `columns` property to define the renderer for cells. Set the `renderer` option for each column the name of the renderer to use.

See the “Define columns” guide for more information on creating column definitions, and the px-data-grid API documentation for a complete list of available options.

The following `columns` definition would use the string renderer for units, the number renderer for heat, and the date renderer for timestamp:

```javascript
[
  {
    name: 'Unit',
    path: 'unit',
    renderer: 'px-data-grid-string-renderer'
  },
  {
    name: 'Heat',
    path: 'heat',
    renderer: 'px-data-grid-number-renderer'
  },
  {
    name: 'Recording Timestamp',
    path: 'timestamp',
    renderer: 'px-data-grid-date-renderer'
  }
];
```

Renderers display data and allow users to edit data when the grid enters editable mode. Each built-in renderer behaves differently:

## String renderer

The **string renderer** can be used by setting the column `renderer` option to `"px-data-grid-string-renderer"`. It displays data without any special formatting.

* If the data is already a string it’ll just be printed out (e.g. `"foo"` would be displayed in a cell as foo)
* If the data is a number or boolean, it will be casted to a string (e.g. `0` is displayed as 0, `1` becomes 1, and `true` becomes true)
* Arrays and objects will be casted using the `toString()` method, which will return `[object Object]` for most browsers.

## Number renderer

The **number renderer** can be used by setting the column `renderer` option to `"px-data-grid-number-renderer"`. It expects data that is already an integer that can be converted to an integer. It takes data and calls `parseInt()` on it to convert it to an integer. The data must be parseable using `parseInt()` or it will be displayed as `NaN`, or not a number.

* If the data is already an integer it’ll just be printed (e.g. `12` is displayed as 12)
* If the data is a float, i’ll be parsed to an integer by all decimal place values (e.g. `5.1` is displayed as 5, `8.9` is displayed as 8). Note that floats will not be rounded, just parsed to an integer.
* If the data is a string, it’ll be parsed to an integer if possible (e.g. `”3"` is displayed as 3). If the data can’t be parsed to an integer, `NaN` will be displayed
* Arrays and objects will be displayed as `NaN`, those data types can’t be converted to a number by `parseInt`

## Date renderer

The **date renderer** can be used by setting the column `renderer` option to `"px-data-grid-date-renderer"`. By default, it expects data formatted as an ISO string and displays data in the format `YYYY-MM-DD HH:MM:ss`. Both of these formats can be changed by adding additional options to the column definition.

To change the format the grid expects when it parses the date/time data passed in from your app, set the `renderConfig.dataFormat` option in your column definition to a valid [moment.js format string](https://momentjs.com/docs/#/parsing/string-format/).  Set the data format to `"ISO"` to send in ISO strings. (That’s the default.) Set the data format to `"X"` to send in unix timestamps.

To change the format the grid uses to display the date/time data to the user, set the `renderConfig.displayFormat` option in your column definition to a valid [moment.js format string](https://momentjs.com/docs/#/parsing/string-format/).  The `"ISO"` and `"X"` data formats from above are also valid display formats.

###  Example #1: Inspection Timestamps

Inspection timestamps are stored in the database as unix timestamps (integers describing a point in time as the number of seconds elapsed since January 1, 1970). Timestamps look like this: `1512063014`.

Timestamps are displayed in the data grid in the format `MM-DD-YYYY HH:MM`.  The unix timestamp from above is displayed as: `"11-30-2017 09:11"`.

The columns format and tableData format must match up to display the date/time correctly:

```html
<px-data-grid></px-data-grid>
<script>
  const grid = document.querySelector('px-data-grid');
  grid.columns = [
    {
      name: 'Timestamp',
      path: 'timestamp',
      renderer: 'px-data-grid-date-renderer',
      rendererConfig: {
        dataFormat: 'X',
        displayFormat: 'MM-DD-YYYY HH:MM'
      }
    }
  ];
  grid.tableData = [
    { "timestamp": 1512063014 }
  ];
</script>
```

# Create custom renderers

Custom renderers allow applications to change the way data is displayed and edited in the grid. Custom renders are tiny web components. When data needs to be displayed the grid creates a new instance of the custom renderer component, passes it data, and attaches it to the DOM.

Custom renderers should be written as [Polymer 2.x style components] (https://www.polymer-project.org/2.0/docs/devguide/registering-elements). The renderer component should extend the `Predix.DataGridRendererMixin` base class, which is the same base class used to create the built-in renderers.

## Tutorial: Create a boolean renderer

This section covers the basic concepts for creating a renderer components by implementing a custom renderer that displays truthy boolean values as a green checkmark (✅) and falsey boolean values as a red (❌). We will use this custom boolean renderer to build an attendee registration status app for the “Centuries of Science” conference.

**Step 1: Setup project**

This example is more in-depth than other guides and requires a basic project with installed dependencies, HTML files, and a server to serve the files. This setup simulates the way you would build custom renderers in a real app. You can complete this tutorial using your browser with Glitch, or complete it on your computer using some simple command-line tools and a text editor.

To use Glitch:

1. Open the [Glitch](https://glitch.com/) website and login using your Github.com account
2. Open the [tutorial-bool-custom-renderer](https://glitch.com/edit/#!/tutorial-bool-custom-renderer) Glitch
3. Click the name of the Glitch in the top left, and select “Remix This” from the menu
4. The page should reload and show you a new copy of the Glitch that you own
5. Click the “Show” button at the top to open your app in a new window

Tip: Open the Glitch editor window and show windows side-by-side. The show window will refresh automatically as you make changes.

To develop locally:

Copy the files down from Glitch onto your computer. Open your shell of choice and `cd` into that directory. Run a web server (like Python SimpleHTTPServer or the npm serve package) in the directory. Open the directory in a text editor and the served files in a browser.

**Step 2: File overview**

We will focus on the following files to make our custom renderer. If you just want to get started building, skip this section and go to Step 3.

* `public/src/my-app.html` - The entry point or root of our registration status app. This component loads Polymer, the px-data-grid component, and our custom renderer component. It also defines the data grid columns and data. This is a Polymer 2.x entry point, but you could use another framework like Vue, React, or Angular, or no framework at all to build it.
* `public/src/bool-custom-renderer.html` - The file we use to define our custom renderer using a Polymer 2.x style component. The custom renderer must be a Polymer 2.x component and cannot be written using another framework.

The other files in the project create a server Glitch uses to serve the files (`server.js`), define the bower dependencies required to use px-data-grid (`bower.json`), and load our app and other dependencies like polyfills and the default theme (`public/index.html`).  You don’t need to touch these for the tutorial.

**Step 3: Use the boolean renderer**

By default, the grid renders all of its data as a string. The attendee registration status is a boolean, but it is just printed out as "true" or “false”:


<catalog-picture
  img-src="../../img/developer-guides/data-grid/cell-renderers-tutorial-boolean-step3-strings"
  img-alt="Data grid cells showing attendee registration status printed out as true or false">
</catalog-picture>

To change the way registration status is displayed, we need to change its column definition to use our custom renderer. Open `my-app.html` and find the constructor method, where the grid columns are defined:

```javascript
/* Define the grid columns */
this.columns = [
  {
    name: 'Registered',
    path: 'registered'
  },
  {
    name: 'Name',
    path: 'name'
  },
  {
    name: 'Email',
    path: 'email'
  }
];
```

Change the renderer used for the registered column to use our new `bool-custom-renderer`:

```javascript
/* Define the grid columns */
this.columns = [
  {
    name: 'Registered',
    path: 'registered',
    // tells the grid to use the custom renderer
    renderer: 'bool-custom-renderer'
  },
  {
    name: 'Name',
    path: 'name'
  },
  {
    name: 'Email',
    path: 'email'
  }
];
```

The name `"bool-custom-renderer"` instructs the data grid to create a new custom element using that tag name to render the registration data. Open `bool-custom-renderer.html` to see how that custom element is defined. The `<dom-module>` tag ID and the `static get is()` function both match this name.

The preview page should have automatically refreshed when you edited the columns (if not, hit refresh). The grid isn’t rendering anything in the registered column:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/cell-renderers-tutorial-boolean-step3-strings"
  img-alt="Data grid cells that are empty for the attendee registration column">
</catalog-picture>

Nothing is showing up because our custom renderer template is empty, except for a  comment:

```html
<template>
  <!-- Boolean renderer template-->
  <!-- @TODO: Show the data -->
</template>
```

Add a bit of Hello World text to the template and hit refresh:

```html
<template>
  <!-- Boolean renderer template-->
  Hello World
</template>
```

You should see Hello World printed out for each cell in the registered column. You’ve implemented your first custom renderer. But it’s not a very smart one. It shows the same data for every cell, regardless of the value. In the next section we will use the cell data to decide what to render.

**Step 4: Use cell data in the custom renderer**

Our boolean custom renderer is built on top of the data grid renderer mixin:


```javascript
class BoolCustomRenderer extends Predix.DataGridRendererMixin(Polymer.Element) {
  ...
}
```

Using this mixin exposes the `value` property, which can be used in the renderer’s template or accessed in its methods. The grid loops over each object in its table data and uses it to create a row. Each cell in the row is assigned its data through the `value` property. The grid will pass `true` or `false` to each bool-custom-renderer instance’s `value` property the row is created.

Replace the Hello World text in the bool-custom-renderer template with `[[value]]`:

```html
<template>
  <!-- Boolean renderer template-->
  [[value]]
</template>
```

The grid should should render the strings “true” and “false” in the registered column. Now that we have access to the value, we can use it to get the right unicode symbol to show in the cell.

Create the method `_getSymbol` on the BoolCustomRenderer class:

```javascript
class BoolCustomRenderer extends Predix.DataGridRendererMixin(Polymer.Element) {
  static get is() { return 'bool-custom-renderer'; }

  static get properties() {
    return {};
  }

  /** Converts the cell value into a nice unicode symbol */
  _getSymbol(value) {
    if (value) {
      return '✅';
    }
    else {
      return '❌';
    }
  }
}
```

Tip: Copy and paste the unicode symbols from the code block above. It isn’t easy to create them with your keyboard.

Now use the new method in the bool-custom-renderer template:

```html
<template>
  <!-- Boolean renderer template-->
  [[_getSymbol(value)]]
</template>
```

You should see the green checkmark (✅) and and red “X” (❌) symbols printed out for each cell in the registered column:

<catalog-picture
  img-src="../../img/developer-guides/data-grid/cell-renderers-tutorial-boolean-step4-symbols"
  img-alt="Data grid cells showing symbols printed out in each cell">
</catalog-picture>

**Step 5: Conclusion**

If you hit any snags or failed to implement the boolean renderer, [open the completed Glitch](https://glitch.com/edit/#!/completed-tutorial-bool-custom-renderer) compare it with your code.

This tutorial covered the basics for creating a custom renderer. Custom renderers are web components that receive cell data and decide how to display it in the grid. Anything that can fit inside a web component template can be used in your renderer’s template. That means any Predix Design System component can technically be used if you import it and use it in your custom renderer template. Some components might not make sense in a data grid, like a time series chart. But try a few out and see what works.

New custom renderers should be placed directly in your application. Write as many as you’d like to solve your use cases. Or fall back on the default string, number, and data renderers if you don’t need anything special.
