---
title: Materiality
layout: default
moduleName: view-design-materiality
pathToRoot: ../../
---

A distinctive element of the Predix Design System is to use material breaks to create a unique appearance for your application. Applications can be created with an entirely dark theme, a high contrast theme or a combination of the two. While the decision
to use a light or dark theme is at the designer's discretion, there are some general guidelines for color combinations.
# Best Practices
### Consider the application's environment
The Predix Design System offers a lot of flexibility to allow you to design an application to best suit your use case. For low or no-light environments, consider a consistent dark theme to combat eye fatigue.

### Be consistent across pages in your app
Pick a theme and stick with it. Audit your pages and workflows to make sure the layout and color usage will remain expected and consistent.

### Use color with purpose
Highlight important data visualizations and high impact information and do it consistently across your app. Cascade backgrounds from dark to light to reinforce information hierarchy.

### Avoid nesting containers
Avoid nesting containers as they eat up space and create visual noise making the information hard to scan. Instead, use spacing and padding as cues to separate information into digestible chunks.

# Color Usage
The Design System <a href="/#/css/px-colors-design/" target="_top">color palette</a> contains an extensive palette of greys designed to be used as material breaks on a page layout. Using colors intended for data visualizations can be distracting and
hinder readability and usability.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/materiality/color_do"
    img-alt="Use greys and neutrals for material breaks."
    title="Do"
    caption="Use subtle neutral colors from the Predix palette of greys for material breaks.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/materiality/color_dont"
    img-alt="Don't use data vis colors for materials."
    title="Don't"
    caption="Don't use data visualization or alert colors as backgrounds for information.">
  </catalog-picture>
</div>


# Recommended Combinations

When applying material breaks, use colors within the same range. For example, with a dark theme use greys 16, 17, 18 and 19 together. Keep dramatic material breaks to a minimum, choosing only to do so when it augments certain important information
such as data visualizations.

### Example Color Combinations<br/>
<catalog-picture img-src="../../img/guidelines/design/materiality/example_color_combinations" img-alt="Example color combinations"></catalog-picture>


# Spacing and Separation

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/materiality/nesting_do"
    img-alt="Use content to navigate in smaller apps"
    title="Do"
    caption="Use space and similar colors to suggest information regions.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/materiality/nesting_dont"
    img-alt="Don't create navigation scheme with two items"
    title="Don't"
    caption="Avoid nesting blocks of color to separate information.">
  </catalog-picture>
</div>


# Reinforcing Hierarchy

Data viz on dark - reinforce information hierarchy
<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/materiality/cascade_do"
    img-alt="Gently cascade color"
    title="Do"
    caption="Cascade color to indicate an information hierarchy, use minimal dramatic breaks.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/materiality/cascade_dont"
    img-alt="Avoid exessive material breaks and banding."
    title="Don't"
    caption="Avoid using excessive color banding to separate information.">
  </catalog-picture>
</div>


# Contrast and Accessibility
In their default states, the Predix Design System components pass accessibility contrast test with an AAA or AA18 . The color palette allows for expanded choices should you have more stringent requirements or an extreme environment that calls for
a unique design.

Check your contrast ratios to ensure they fall within accessibility standards with [EightShapes' Contrast Grid](http://contrast-grid.eightshapes.com/).

* [Light Theme](http://contrast-grid.eightshapes.com/?background-colors=ffffff%2C%20%24white%0D%0A%23EBEFF2%2C%20%24gray%201%0D%0A%23E2E8ED%2C%20%24gray2&foreground-colors=%23677E8C%2C%20%24gray10%0D%0A%232C404C%2C%20%24gray15&es-color-form__tile-size=compact)
* [Dark Theme](http://contrast-grid.eightshapes.com/?background-colors=%2323343F%2C%20%24gray16%0D%0A%231B2A33%2C%20%24gray17%0D%0A%23121F26%2C%20%24gray18&foreground-colors=%23B6C3CC%2C%20%24gray5%0D%0A%23677E8C%2C%20%24gray10%0D%0A&es-color-form__tile-size=compact)

<catalog-picture img-src="../../img/guidelines/design/materiality/contrast_chart" img-alt="Eight Shapes Contrast Chart"></catalog-picture>

