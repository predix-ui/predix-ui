---
title: Release Notes
moduleName: view-about-release-notes
pathToRoot: ../../
layout: default
---

# Q1 2018 Release

## Features & Enhancements

* [Product Switcher](#/elements/px-product-switcher) - new navigation control for switching between products/applications in a suite
* [Notification](#/elements/px-notification) - new component for contextual / in-situ alert notifications
* [Threshold Bar](#/elements/px-threshold-bar) - new component for displaying linear horizontal gauges with configurable threshold areas
* [Dropdown](#/elements/px-dropdown) - enhanced with a mobile responsive view
* [Modal](#/elements/px-modal) - added a property and configuration for full-screen application modals

# Q4 2017 Release

## Polymer 2.x Upgrade
Almost all\*\* of the Predix Design System components have been upgraded to be Polymer 1.x/2.x [hybrid elements](https://www.polymer-project.org/2.0/docs/devguide/hybrid-elements), meaning they can be used with either Polymer version.

\*\* The only component not upgraded to Polymer 2.x hybrid is the px-data-table, which will be replaced with a more feature-rich component based on the Vaadin grid. The new grid, which is being built entirely in Polymer 2.x, is expected to be released in Q1 of 2018. Since this site now runs on Polymer 2, you may see a broken demo for px-data-table, but you can still access it in a standalone fashion [here](https://www.predix-ui.com/px-data-table/px-data-table/).

Benefits of upgrading to Polymer 2.x include:
* Better inter-operability for the Angular, React and Vue frameworks
* Better performance in browsers with native support for web components
* Better performance of the components, as we can use features not available in Polymer 1.x
* Ongoing Google support of Polymer 2.x (bug fixes, etc)

The syntax of light DOM content distribution slots has changed in Polymer 2.0, resulting in the following **API breaking changes / major version bumps**. In the previous version, for instance, you may have passed an action button into a Card with `class="actions"` but now you should use `slot="actions"` instead. Refer to the API of each component for more details and example code.

Impacted components:
* [Card](/#/modules/px-card) (v2)
* [Modal](/#/modules/px-modal) (v3)
* [View Header](/#/modules/px-view-header) (v2)
* [Widget Cards](/#/modules/px-widget-cards) (v4)


## Features & Enhancements

* [Card](/#/modules/px-card) - in addition to the above API change, all of the view service related behaviors (card/dealer/dashboard) were deprecated
* [Context Browser](/#/modules/px-context-browser) - added the ability to set "favorites" for quicker access
* Data Visualization
  * added flexible API for creating and interacting with chart annotations (see [developer guide](/#/develop/vis/annotations))
  * added single point search option
  * added lasso functionality for selection of points
  * the web worker is now a blob, you no longer need to include the files in your build process
* [Date/Time Refactoring](/#/develop/datetime-changes)
* [Dropdown](/#/modules/px-dropdown) - slot added so that any arbitrary element can be used as the dropdown trigger
* [Inbox](/#/modules/px-inbox) - property added to make referencing the selected item easier; removed dependency on moment.js
* [Modal](/#/modules/px-modal) - simplified trigger/modal relationship and configuration of positive/negative action buttons
* [Tile](/#/modules/px-tile) - updated visual design, new property for text that appears on the bottom of tile vs on hover


# Q3 2017 Release

## Features & Enhancements

* Data Visualization Updates
  * [Radar](/#/modules/px-vis-radar), [Parallel Coordinates](/#/modules/px-vis-parallel-coordinates), and [Polar](/#/modules/px-vis-polar) charts - added the ability to zoom in/out
  * [Tooltip](/#/elements/vis/px-vis/px-vis-tooltip) - added option for event name in tooltips
  * [Toolbar](/#/elements/vis/px-vis/px-vis-toolbar) - added the ability to customize placement of toolbar sub-menu
* [Icon Set](/#/modules/px-icon-set) - expanded the set of icons to nearly 200
* [Map](/#/modules/px-map) - extended px-map-marker to allow custom colors and types

## New Components

* [Chip](/#/modules/px-chip) - represents a small piece of information, such as a contact or filter, with an optional toggle
* [Heatmap Grid](/#/modules/px-heatmap-grid) - displays a data set in a grid layout with a color scale based on the values
* [Panel](/#/modules/px-panel) - container for placement of controls or content; can be fixed or relative, and persistent or shown/hidden
* [Steps](/#/modules/px-steps) - shows a sequence of steps and progress made - useful for wizards, multi-step forms, etc
* [Tile](/#/modules/px-tile) - displays an image with accompanying text, with two different states and an animation on hover or mobile tap

## Site improvements on predix-ui.com

* [Component gallery](/#/gallery) with visual previews and filtering of design patterns and components
* Added new development and design guidelines
* Component code snippets can be expanded & collapsed
* Icons added to indicate suitability of components for use on mobile/tablet/desktop


# Q2 2017 Release

Introducing **Cirrus**, the new aesthetic for the Predix Design System, which brings a more contemporary and sophisticated visual style, and adds to the diversity of design patterns available.

## Features & Enhancements

* New visual language for all components
* Fresh code for all 117 Predix CSS and Component repositories
* Sketch stencils with a Design Starter Kit
* Design guidelines
* A new single column [Context Browser](/#/modules/px-context-browser) component and separate [Breadcrumb](/#/modules/px-breadcrumbs) component
* New [Navigation](/#/modules/px-app-nav) patterns - horizontal, vertical, and collapsible - to improve web app navigation
* New [App Header](/#/modules/px-app-header) & [Branding Bar](/#/modules/px-branding-bar)
* New set of 177 icons, which replaces the font-awesome icons

We’re really excited about the new designs, and very much appreciative all the contributions to this effort from the community. For specifics on the release, please read the [Q2 2017 release notes](/#/develop/migrate/api-changes).
