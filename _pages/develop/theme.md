---
title: Theme component styles and colors
moduleName: view-develop-theme
pathToRoot: ../../
layout: default
---

This guide addresses how to apply a theme to the Predix Design System components in your application.

# What is a theme

Themes are a collection of CSS variables used to apply styles to Predix Design System components. Predix Design System components look at these CSS variables to apply a variety of styles, including colors, typefaces, and other styles. The API docs for each component include a list of available CSS variables. This approach is based on the methodology outlined by Polymer [here](https://www.polymer-project.org/1.0/docs/devguide/styling.html#xscope-styling).

The Predix Design System components ship with generic colors and fonts by default. Apps should apply a theme, either one of the provided themes or a custom one, to match components with their overall visual style.

<div class="halves guidelines">
  <catalog-picture title="chart-unthemed" img-src="../../img/guidelines/dev/migrate_theme/chart-unthemed" caption="Example of a chart unthemed">
  </catalog-picture>
  <catalog-picture title="chart-themed" img-src="../../img/guidelines/dev/migrate_theme/chart-themed" caption="Example of a chart with theming applied">
  </catalog-picture>
</div>
<div class="halves guidelines">
  <catalog-picture title="slider-unthemed" img-src="../../img/guidelines/dev/migrate_theme/slider-unthemed" caption="Example of slider unthemed">
  </catalog-picture>
  <catalog-picture title="slider-themed" img-src="../../img/guidelines/dev/migrate_theme/slider-themed" caption="Example of slider with theming applied">
  </catalog-picture>
</div>

# Available Themes

Predix Design System supplies two, prebuilt themes:

* [Light Theme](https://github.com/PredixDev/px-theme)
* [Dark Theme](https://github.com/PredixDev/px-theme)

You can view these two themes on this website. Simply flip the switch in the upper right-hand corner.

You can also build your own themes by defining the CSS variables listed in each component.

# How to apply a theme

Applying a theme is easy. Simply include the theme in your project, import it, and include the style - the styles are automatically applied to your components.

## Install

Install the theme in your project by including it in your `bower.json`:

```javascript
"px-theme": "^3.0.0"
// OR
"px-dark-theme": "^2.0.0"
```

## Import

Import it onto your page:

```html
<link rel="import" href="../px-theme/px-theme-styles.html">
<!-- OR -->
<link defer rel="import" href="../px-dark-theme/px-dark-theme-styles.html">
```

## Include in your app

Include the styles in your app:

```html
<custom-style>
  <style include="px-theme-styles" is="custom-style"></style>
</custom-style>
<!-- OR -->
<custom-style>
  <style include="px-dark-theme-styles" is="custom-style"></style>
</custom-style>
```
Note: the `<custom-style>` wrapper is only needed for Polymer 2. [Documentation here](https://www.polymer-project.org/2.0/docs/upgrade#shadow-dom-styles).

The styles will be available on your page and cascade down to subcomponents. So if you import the styles at the main page of your app, everything should receive it. If you just import it to a subcomponent, then only that subcomponent and its children will pick up the styles.

# Overriding individual styles

The same [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (or "custom properties") used for applying an application-wide theme can also be used for overriding individual styles within many of the Predix Design System components and CSS repositories.

Refer to the "Styling" section of the API documentation of each element for a list of the custom properties available for that component or module. The CSS modules allow for override via *either* Sass or CSS variables - more on that [here](/#/css/px-starter-kit-design).

Like the theming `include` statements above, CSS variables must be wrapped in a custom-style block in order to be used with the Predix Polymer components. This provides a shim for older browsers that don't natively support CSS custom properties.
You can optionally combine the placement of individual variables with the theming block as shown below.

In addition, you should scope the variables appropriately to target the desired component(s), or use the `html` selector to apply custom properties across all instances of a component in your application.
In this example, the button styles in the first block would be applied to every button instance in an application, whereas the second block would apply to all px-dropdowns, and the third would only apply to elements with the `myDropdown` class.

```html
<custom-style>
  <style include="px-theme-styles" is="custom-style">
    html {
      --px-btn-background: black;
      --px-btn-background--hover: darkgray;
      --px-btn-background--pressed: lightgray;
      --px-btn-color: white;
    }
    px-dropdown {
      --px-dropdown-bg-color: black;
    }
    .myDropdown {
      --px-dropdown-text-color: white;
    }
  </style>
</custom-style>
```

## More information

For further documentation on the use of themes, CSS custom properties, dynamically or programmatically applying variables, and limitations of the shim, please refer to the [Polymer documentation](https://www.polymer-project.org/2.0/docs/devguide/custom-css-properties).
