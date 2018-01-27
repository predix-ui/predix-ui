---
title: Layering & Elevation
layout: default
moduleName: view-design-elevation-layering
pathToRoot: ../../
---

Predix applications make use of layering and elevation between screen elements to create a sense of tactility and reinforce task hierarchy.

# Best Practices
### Be consistent with layering
Follow the guidelines and layer elements appropriately based on their use. Carry the metaphor throughout your app for a consistent experience.


### Respect the z-axis
If two objects are on the same layer, they can't occupy the same space.


### Don't invent new layers
Use [px-shadows-design](#/css/px-shadows-design) when applying layering and elevation to your app. Take the use case into account to determine the appropriate existing layer.

# Component Layering
There are six layers elements can reside on in a Predix application. Each layer is dedicated for a specific purpose and resides in it's own z-index so that elements can be stacked on top of each other when required.
When an element in a specified layer contains content, the content resides on that layer as well. To retain a sense of depth, elements that are on the same layer cannot occupy the same space on the screen.

<catalog-picture img-src="../../img/guidelines/design/elevation-layering/layering" img-alt="Layering"></catalog-picture>


| Class | Description | Example |
| :---- | :---------- | :------ |
Base | The page structure, layout, cards and content. There is no elevation or shadows displayed on this layer. | [px-card](#/components/px-card) |
Component | Tactile elements within a component such as toggles and shadows to indicate a depth. | [px-toggle](#/components/px-toggle) |
Temporary State | Tooltips, drop down menus and overlays and objects that are displayed for a very short period of time. | [px-tooltip](#/components/px-tooltip) |
Navigation | Reserved for application navigation and associated menus. | [px-app-nav](#/components/px-app-nav) |
Notifications | Intended for elements that are important but aren't critical for the user to acknowledge to complete a task. | [px-alert-message](#/components/px-alert-message) |
Modal | For elements that require the user's full attention to complete a task. | [px-modal](#/components/px-modal) |



# Elevation
The layers of elevation are labeled by the blur radius on the shadow. The representation of the elevation is driven by the styling of the shadow. All shadows are black with a 20% opacity and the shadow offset is half of the blur radius.

<catalog-picture img-src="../../img/guidelines/design/elevation-layering/shadow_scale" img-alt="shadow scale"></catalog-picture>

