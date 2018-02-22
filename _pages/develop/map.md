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
components and Polymer. The framework includes a base mapping component (`<px-map>`)
that can be used with many different subcomponents to solve common mapping UI
problems, like plotting geographic data.

### What's under the hood

The current major release of `px-map` uses the open source Leaflet library to
support displaying a map with base tiles and geospatial overlays. Future
iterations of the component may offer the ability to use a different library in
place of Leaflet, while keeping the same basic API.

### What you can do with px-map

Out of the box, `px-map` includes the basic things needed to draw and plot data
on an interactive map. It is also extensible — development teams are encouraged
to build their own subcomponents that add features needed for their application.

## Basic concepts

Use the map to plot geographic data such as individual assets or clusters of
assets and information about them. The data concepts underlying the map include:

- **Base layer:** The base layer of a map renders tile images that include
information such as streets, mountains, and national parks. For example,
satellite, terrain, and map view are all different base layer styles.
- **Overlay:** Information that is put on top of a map's base layer that is
specific to the purpose of that map. For example, traffic data or bike lane
information might be set as an overlay on a road map.
- **Control:** A map layer that allows the user to manipulate the map, e.g. by
zooming in, out, or to their current location.
- **CRS (Coordinate Relationship System/Coordinate Projection System):** A
framework for defining real-world locations that attempts to reconcile the geoid
shape of the earth with the two-dimensional plane of a map.
[As described by ArcGIS](http://desktop.arcgis.com/en/arcmap/10.3/guide-books/map-projections/what-are-map-projections.htm),
a CRS may either be "geographic (in which spherical coordinates are measured
from the earth's center) or planimetric (in which the earth's coordinates are
projected onto a two-dimensional planar surface)."

### Graphic: map layers

## Subcomponents

The following subcomponents are available for use with px-map:

Base map

- `<px-map>`: Draws the underlying map, sets location/zoom and notifies updates
when the user interacts with the map, enables and disables interactions,
orchestrates subcomponents

Tile layers

- `<px-map-tile-layer>`: Calls a tile service API to fetch underlying tile images
for the map
- `<px-map-tile-layer-bing>`: Calls the Bing Maps API to fetch underlying tile
images for the map
- `<px-map-tile-layer-google>`: Calls the Google Maps API to fetch underlying
tile images for the map
- `<px-map-tile-layer-wms>`: Displays WMS services as tile layers on the map.

Overlay/visualization layers

- `<px-map-layer-geojson>`: Draws GeoJSON data as vectors on the map
- `<px-map-layer-group>`: Groups related overlays together to allow for bulk
interactions (e.g. hide all in the group)
- `<px-map-marker-static>`: Creates a marker that shows the state of a point/asset
(e.g. with color)
- `<px-map-marker-symbol>`: Creates a marker with an icon that shows the state
of a point/asset
- `<px-map-marker-locate>`: Creates a marker that represents the user's location
- `<px-map-marker-group>`: Draws many markers in clusters, useful for visualizing
thousands of points that can be dynamically updated

UI components

- `<px-map-popup-info>`: Binds a popup that can include text or an image to a marker
- `<px-map-popup-data>`: Binds a popup that can include text and key/value data
to a marker

Controls

- `<px-map-control-zoom>`: Adds zoom buttons the user can tap to zoom in or out
of the map
- `<px-map-control-scale>`: Adds a scale that shows the distance of an area on
the map in miles/kilometers
- `<px-map-control-locate>`: Adds a button the user can tap to locate themselves
on the map and center the map on their location

## Set up in your app

### Choosing a CRS
As described above, a CRS is a coordinate reference system used to project
geographical points into pixel coordinates. The CRS can only be set once before
the map is first initialized. `px-map` defaults to the most common web mapping
projection [EPSG 3857](https://epsg.io/3857). Most use cases do **not** require
changing the default CRS bring used by px-map, and we strongly recommend using
the default. If your customers give you data in a different projection system,
you'll have to re-project that data to our CRS. Otherwise, you can set the CRS
on the map to the same one being used by your data with the `crs` property on
px-map.

### Choosing a tile server

Most px-map demos use the OpenStreetMap public tile service to serve map tiles
(e.g. `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) with the
px-map-tile-layer subcomponent. This tile service is used for demo purposes only.
**You should not use this tile service for production applications; you will
need to implement or purchase your own tile service.**

The [OpenStreetMap Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)
details specific restrictions for developers using their public tile service.
These restrictions include the following provision: "Heavy use (e.g. distributing
an app that uses tiles from openstreetmap.org) is forbidden without prior
permission." If you choose to use the OpenStreetMap service for demos or development,
you should likely replace the service URLs when your app is shipped to production.

The following list of companies provide tile service APIs that may be free or
paid and should be compatible with the px-map-tile-layer (note that these are
not endorsed, but just offered as options):

  - [Mapbox](https://www.mapbox.com/help/how-mapbox-data-works/)
  - [Carto](https://carto.com/location-data-services/basemaps/)
  - [Mapzen](https://mapzen.com/products/maps/)


You can also use the `px-map-tile-layer-bing` component to load map tiles from
the Bing API, the `<px-map-tile-layer-google>` component to load map tiles from
the Google Maps API, or the `<px-map-tile-layer-wms>` component to display WMS
services as tile layers on the map.

### Example: creating a px-map in your application

<iframe height='480' scrolling='no' title='px-map-demo'
src='//codepen.io/talimarcus/embed/BYxyNb/?height=265&theme-id=0&default-tab=html,result&embed-version=2'
frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>

## Concepts & patterns

### Defining your GeoJSON data

GeoJSON is a JSON-based format used to represent a variety of geographic data
structures. You can use GeoJSON to represent geometry (e.g. Points, Polygons),
features, or feature collections. GeoJSON is always composed of a single object,
and that object must have a member with the name "type." The type refers to the
type of GeoJSON object and must be one of: `"Point"`, `"MultiPoint"`, `"LineString"`,
`"MultiLineString"`, `"Polygon"`, `"MultiPolygon"`, `"GeometryCollection"`,
`"Feature"`, or `"FeatureCollection"`.

**Geometry Objects**
All Geometry objects (aside from a `"GeometryCollection"`) must have a member
with the name `"coordinates"`, the value of which is an array (or array of arrays)
of latitude and longitude coordinates.
- **Point:** A Point is a single point on a map which has no area and can be
defined by its latitude and longitude coordinates, e.g.:
  ```json
  {
    "type": "Point",
    "coordinates": [0, 0]
  }`
  ```
- **Polygon:** A Polygon represents an area on a map and is defined by an array
of four or more latitude and longitude coordinate arrays (positions). Note that
the first and last positions MUST be identical, e.g.:
  ```json
  {
    "type": "Polygon",
    "coordinates": [
      [
        [0, 0], [10, 10], [10, 0], [0, 0]
      ]
    ]
  }
  ```

  **Feature Objects**
  A Feature allows you to describe a Geometry with a set of properties. A Feature
  object must have the type `"Feature"`, as well as `"geometry"` and `"properties"`
  members. E.g.:
    ```json
      {
        "type": "Feature",
        "properties": {
            "name": "M. A. Chidambaram Stadium",
            "sport": "Cricket",
            "team": "Chennai Super Kings"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [80.2792802, 13.0628075]
        }
      }
    ```

  **Feature Collection Objects**
  A Feature Collection is simply a collection of individual Features. A Feature
  Collection object must have the type `"FeatureCollection"`, as well as member
  with the name `"Feature"` whose value is an array of Feature objects, e.g.:
  ```json
  {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
          "name": "Fenway Park",
          "sport": "Baseball",
          "team": "Boston Red Sox"
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-71.09938384, 42.3466789]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Groupama Stadium",
          "sport": "Soccer",
          "team": "Olympique Lyonnais"
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.9798403, 45.765295]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Hillsborough Stadium",
          "sport": "Soccer",
          "team": "Sheffield Wednesday F.C."
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-1.5006631, 53.4114317]
      }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Oracle Arena",
          "sport": "Basketball",
          "team": "Golden State Warriors"
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-122.2030494, 37.7502917]
      }
    }]
  }
  ```
See the [GeoJSON spec](http://geojson.org/geojson-spec.html) for more guidance
on generating valid GeoJSON.

### Color customization
### Handling large volumes of data
### Rendering data in a specific order
