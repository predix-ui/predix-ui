---
title: Developing with px-map
moduleName: view-develop-map
pathToRoot: ../../
layout: default
---

<style>
  .gif {
    width: 100%;
    margin-top: .25rem;
  }
</style>

`px-map` is a lightweight framework for building interactive maps with web
components and Polymer. The framework includes a base mapping component (<px-map>)
that can be used with many different subcomponents to solve common mapping UI
problems, like plotting geographic data.

### What's under the hood

The current major release of `px-map` uses the open source Leaflet library to
support displaying a map with base tiles and geospatial overlays. Future iterations of
the component may offer the ability to use a different library in place of
Leaflet, while keeping the same basic API.

### What you can do with px-map

Out of the box, `px-map` includes the basic things needed to draw and plot data
on an interactive map. It is also extensible — development teams are encouraged
to build their own subcomponents that add features needed for their application.

## Basic concepts

### Graphic: map layers

## Subcomponents

The following subcomponents are available:

Base map

- `<px-map>`: Draws the underlying map, sets location/zoom and notifies updates when the user interacts with the map, enables and disables interactions, orchestrates subcomponents

Tile layers

- `<px-map-tile-layer>`: Calls a tile service API to fetch underlying tile images for the map
- `<px-map-tile-layer-bing>`: Calls the Bing Maps API to fetch underlying tile images for the map
- `<px-map-tile-layer-google>`: Calls the Google Maps API to fetch underlying tile images for the map
- `<px-map-tile-layer-wms>`: Displays WMS services as tile layers on the map.

Overlay/visualization layers

- `<px-map-layer-geojson>`: Draws GeoJSON data as vectors on the map
- `<px-map-layer-group>`: Groups related overlays together to allow for bulk interactions (e.g. hide all in the group)
- `<px-map-marker-static>`: Creates a marker that shows the state of a point/asset (e.g. with color)
- `<px-map-marker-symbol>`: Creates a marker with an icon that shows the state of a point/asset
- `<px-map-marker-locate>`: Creates a marker that represents the user's location
- `<px-map-marker-group>`: Draws many markers in clusters, useful for visualizing thousands of points that can be dynamically updated

UI components

- `<px-map-popup-info>`: Binds a popup that can include text or an image to a marker
- `<px-map-popup-data>`: Binds a popup that can include text and key/value data to a marker

Controls

- `<px-map-control-zoom>`: Adds zoom buttons the user can tap to zoom in or out of the map
- `<px-map-control-scale>`: Adds a scale that shows the distance of an area on the map in miles/kilometers
- `<px-map-control-locate>`: Adds a button the user can tap to locate themselves on the map and center the map on their location

## Set up in your app

### Example: creating a px-map in your application

<iframe height='320' scrolling='no' title='px-map-demo' src='//codepen.io/talimarcus/embed/BYxyNb/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>

### Choosing a tile server

Most px-map demos use the OpenStreetMap public tile service to serve map tiles
(e.g. `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) with the px-map-tile-layer
subcomponent. This tile service is used for demo purposes only. **You should not use
this tile service for production applications; you will need to implement or
purchase your own tile service.**

The [OpenStreetMap Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)
details specific restrictions for developers using their public tile service.
These restrictions include the following provision: "Heavy use (e.g. distributing
an app that uses tiles from openstreetmap.org) is forbidden without prior
permission." If you choose to use the OpenStreetMap service for demos or development,
you should likely replace the service URLs when your app is shipped to production.

The following list of companies provide tile service APIs that may be free or
paid and should be compatible with the px-map-tile-layer (note that these are
not endorsed, but just offered as options):

<ul>
  <li>[Mapbox](https://www.mapbox.com/help/how-mapbox-data-works/)</li>
  <li>[Carto](https://carto.com/location-data-services/basemaps/)</li>
  <li>[Mapzen](https://mapzen.com/products/maps/)</li>
</ul>

You can also use the px-map-tile-layer-bing component to load map tiles from the Bing API.

## Concepts & patterns

### Color customization
### Handling large volumes of data
### Rendering data in a specific order
