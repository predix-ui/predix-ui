---
title: "Data Grid: Feature Overview"
layout: default
moduleName: view-develop-data-grid-overview
pathToRoot: ../../../
---

*This guide is under development. Check back for updates.*

px-data-grid is a powerful, adaptive, data visualization tool to aid users when they have a large amount of data to display or manipulate. In its simplest form, the grid displays data in a grid or tabular format with rows and columns to provide a birds eye view of the data.

Data grid features allow users to scan, analyze, compare, filter, sort, and edit data to better understand the information, derive insights, and perform actions.

**Example use cases:**

* As an industrial internet user of big data, I want to analyze, manipulate and/or edit my large data-set in a tabular format in a data-grid, so that I can gain insights on the data.
* As an industrial internet user of big data, I want to be able to easily scroll or page through my data results, so that I can scan and compare data.
* As an industrial internet user of big data, I want to be able to sort, filter, highlight, select data, so that I can drill-down to a subset of the data.

**Release status:**

The beta version of the Predix Design System px-data-grid has been released with the priority user-requested features that are listed below and detailed further in the documentation.

# Features

## Display of data

Several data formats can be displayed in the data-grid cells including text/string, number with decimal places, and date/timestamp with the capability to use custom validators. In addition, an image, spark line or micro-chart, and HTML object can be displayed.

The data-grid has the feature to expand a row to reveal more information. Using expandable rows is common when you have additional information for a row, or row cells that do not need to be shown at all times. This helps minimize visual clutter. There is the capability to hover over a cell and applications can also use this feature to use a tooltip or other form to show more information about the cell.

## Theming

The Predix Design System data-grid offers the ability to theme in the Predix Design System Dark Theme (suitable for control rooms/dim light situations) and Light Theme. Custom theming/branding is also possible.
Zebra or row striping is offered which can help users to differentiate between rows.

## Selection and highlighting

Rows, columns and/or cells can be individually highlighted based on custom rules and priority can be set. The data-grid allow single row selection with radio buttons, as well as multiple row selection with checkboxes. There is also the ability to select all the rows displayed and deselect all.

Columns can be hidden/revealed and it is possible to freeze/unfreeze columns. The frozen columns will appear left-justified on the data-grid.

## Sorting and grouping

The data-grid allows sorting by a single column or multiple columns. The order of multiple sorted columns is indicated in the column header. There is also a sort indicator to indicate ascending or descending. Sorting is invoked by clicking on the column header. There is also the ability to select one or multiple rows to be sorted to the top of the data-grid.

Grouping by column is also provided as a feature. This allows several rows to be grouped based on a specific column and appear grouped together.

## Sizing rows and columns

The data-grid support auto-sizing of both rows and columns. Customization is also possible to set grid size and to allow for custom column width to be set. Text can be auto-wrapped or there is the capability to have an ellipsis to be used to indicate more text.

## Grid data and manipulation

The data-grid provides an API to add or delete a row and to update or edit a row with inline editing. It is possible to indicate which columns can be editable. Custom validation is possible on editable cells.

Column re-ordering is possible with a drag and drop feature which allows the user to re-order the columns.

There is the capability to allow applications to print or export the displayed data-grid rows which can be invoked via the Table Action menu.

The data-grid supports both server side loading and client side loading with both infinite scrolling or pagination supported. There is the capability to have a fixed header with scrolling. With pagination, there are some features that cannot be used, such as Sort by Selection.

## Filtering

There are two ways to filter the data-grid. There is auto-filter functionality which can be used to search or filter across the table for a string or number.

For more advanced filtering, there is a modal which is invoked for table filtering which allows the user to set multiple filtering conditions.
Advanced filtering allows filtering by date/timestamp range, set durations, numbers, text/string/wildcard, and number range which utilizes a slider.
The data-grid can be filtered to show, hide, or highlight rows.
Filters can be set for any column or specific columns.
Several conditions are allowed depending on the data format including contains, equal, not equal, greater than, less than, starts with, ends with, and wildcard.
The filtering conditions can be applied to "Any" column or "All" columns

## User preferences

Applications can implement the ability to save and reset user default preferences or settings that have been applied to the table.

## Internalization

The data-grid follows the Predix Design System internalization capability which allows applications to localize into their required languages. NOTE: Support for Right-to-Left languages is not currently available.

# FAQ

### What should teams participating in the beta do?

Teams should test the grid on its own or in the app, try real use cases, show stakeholders and do user tests. Any issues or requests uncovered during testing should be filed as Github issues or directed to the design system team.

### What does beta mean? Should I use this in production?

The beta release is meant for internal testing by GE teams. During the beta period we do not recommend you use the data grid in production apps, as we will be making changes to improve stability and the overall user experience. Some APIs will also likely break during the beta period. If you wait for the general release the grid will be more stable.

### How long will the beta period last for? When will the new grid be ready for production?

The beta period will last for the month of March. During the beta we will listen to customer feedback and prioritize fixes and other requests as we receive them. We will keep teams involved in the beta up-to-date about updates to the grid, and later in March we will make an announcement when we have a firm date for releasing the grid in GA.

### Does the new grid work on mobile screen sizes?

No, we did not prioritize mobile for this release. We will revisit mobile/responsive behavior in a future release based on customer feedback.

### What browsers does the new grid support?

The new grid supports the same browsers as the other Predix Design System components:

* Chrome: Last two major versions
* Safari: Last two major versions
* Firefox: Last two major versions
* Edge
* Internet Explorer 11
* Last two major versions of standard iOS and Android browsers

### Does the new grid meet accessibility standards?

The grid does support keyboard navigation and actions, but there are still quirks we are working out.

### What's the plan for the existing px-data-table? Will you continue to support it?

The px-data-table will not be updated with new features, and will not be upgraded to Polymer 2+. We are planning to open source the entire design system, and we will be opening up enhancements and support of the px-data-table to the community using it.
