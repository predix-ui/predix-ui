---
title: "Data Grid: Feature Overview"
layout: default
moduleName: view-develop-data-grid-overview
pathToRoot: ../../../
---

Px-data-grid is a powerful, adaptive data visualization tool to aid users when they have a large amount of data to display or manipulate. In its simplest form, the grid displays data in a grid or tabular format with rows and columns to provide a bird's-eye view of the data.

Data grid features allow users to scan, analyze, compare, filter, sort, and edit data to better understand the information, derive insights, and perform actions.

**Release status:**

The beta version of the px-data-grid was released on March 2, 2018 with the most user-requested features listed below and detailed further in the documentation.

# Features

## Display of data

You can display several data formats in the data-grid cells out of the box, including text strings, numbers with decimal places, and date/timestamps. Editable cells can have custom validators based on these data types. In addition, you can easily create custom renderers to display an image, spark line / micro-chart, or any other custom HTML content that is required.

Users can expand data-grid rows to reveal more information. Using expandable rows is common when you have additional information for a row, or cells that do not need to be shown at all times - this helps minimize visual clutter. Users can also hover over a cell and your application can detect this to display a tooltip or other component with more information about the cell.

## Theming

You can theme the px-data-grid with the Predix Design System Dark Theme (suitable for control rooms/dim light situations) or Light Theme. Custom theming/branding is also possible.
You can enable zebra or row striping to help users scan across long rows.

## Selection and highlighting

Rows, columns and/or cells can be individually highlighted based on custom rules, and you can specify the priority of each highlight type. The data-grid allow single row selection with radio buttons, as well as multiple row selection with checkboxes. A select all / deselect all affordance is also provided.

Users can show or hide columns as well as freeze or unfreeze columns. Frozen columns appear pinned to the left side of the data-grid.

## Sorting and grouping

The data-grid allows sorting by a single column or multiple columns. The order of multiple sorted columns, as well as ascending or descending sort order, are indicated in the column headers. Sorting is invoked by clicking on the column header. Selected rows can also be sorted to the top or bottom of the grid.

Grouping by column is also supported. This allows rows with the same value in a specific column to be grouped together in an expandable accordion.

## Sizing rows and columns

The data-grid supports auto-sizing of both rows and columns, but you can also customize the grid height or column widths. Text can be wrapped automatically or truncated with an ellipsis.

## Grid data and manipulation

The data-grid provides an API to add or delete rows, and to update rows with inline editing. You can configure which columns are editable, and specify custom validation for editable cells.

Users can re-order columns with a drag-and-drop feature.

There is the capability to allow applications to print or export the displayed data-grid rows which can be invoked via the Table Action menu.

The data-grid supports both server-side loading and client-side loading, with both infinite scrolling and pagination as options. You can choose to fix the headers in place and only scroll the data rows.

## Filtering

There are two ways to filter the data-grid. The "auto-filter" will perform a simple search across the entire table for a string or value.

For more advanced filtering, users invoke a modal in order to set detailed filtering conditions.
They can filter by date/time range, specific durations, numbers, text/string/wildcard, and number ranges; appropriate picker controls are provided for each.
Filters can be used to show, hide, or highlight rows - across all columns, or only applied to specific columns.

## User preferences

Applications can implement the ability to save and reset user preferences or settings that have been applied to the data-grid.

## Internationalization

The data-grid follows the same pattern as all of the other Predix Design System components for localization and internationalization. NOTE: Support for right-to-left languages is not currently available.

# FAQ

### What should teams participating in the beta do?

Teams should test the grid on its own or in their application, try real use cases, show stakeholders, and perform user testing. Any issues or requests uncovered during testing should be filed as [GitHub issues](https://github.com/predixdesignsystem/px-data-grid/issues) or directed to the design system team.

### What does "beta" mean? Should I use this in production?

The beta release is meant for internal testing by GE teams. During the beta period, we do not recommend you use the data grid in production applications, as we will be making changes to improve stability and the overall user experience. Some APIs will also likely break during the beta period. If you wait for the general release the grid will be more stable.

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
