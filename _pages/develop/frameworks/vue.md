---
title: Use components in Vue
moduleName: view-develop-frameworks-vue
pathToRoot: ../../../
layout: default
---

*This guide is under development and subject to change. The information may change. Check back for updates.*

# Overview

## Use our web components in any framework

Our components are built to work inside all modern JavaScript frameworks, or to work on their own with no framework at all. Each one is a web component — a self-contained bundle of HTML, JavaScript, and CSS that looks and works just like a standard HTML tag.

Our components are built to use standard web platform features that are framework agnostic and work with app developers’ codebases rather than limiting technical choices.

Development teams across GE are successfully using our components inside products built with Angular 2/4, React, Vue,  Angular 1, Polymer, and a variety of other frameworks.

Read more in our blog post: [Components that work in your framework and everywhere else too](https://medium.com/ge-design/predix-design-system-components-that-work-everywhere-97b774028b37)

## Polymer is a wrapper, not a library

You’ve probably heard that our components are built with Polymer, Google’s library that helps make it easy to create web components and wire up styling, data-binding, and other convenient features. That’s true, and we’re big fans of using Polymer to build components. But if you’re developing an app using our components, you don’t need to worry very much about Polymer or learn how to build with it.

Polymer can be used as a framework, like Vue or Angular, but that’s optional. You can use our components as interactive HTML tags configured via attributes and properties that fire off rich events when they’re interacted with by users. You don’t have to build your app using Polymer as a framework. You can make the technical decisions that are right for your team and product.

# Use our components in Vue

Predix Design System components work inside Vue apps. You can select from more than 100 components that solve simple and complex interaction problems for your application and use them alongside Vue components and views.

Predix Design System SCSS modules can be imported into app SCSS files and used to generate styles for application views or Vue components.

The Predix.io Console team is currently rebuilding their codebase using Vue 2 and Predix Design System components and SCSS modules, and helping the design system team identify and solve any issues found when using the components in Vue.

The following information covers many of the questions development teams have when they start using PDS components in Vue:

## Install components

Predix Design System components are installed using bower, a front-end package manager. Most Vue apps use npm or yarn as their primary package manager for installing Vue libraries. Bower and npm/yarn can be used side-by-side for package management without any issues. Many teams across GE, including the design system team, use this approach.

To install components:

1. Install the bower CLI tool via npm in your shell of choice: `$ npm install -g bower`
2. Open your app directory in your shell. Run `$ bower init` to create a `bower.json` file that lists your dependencies
3. Add `bower_components` to your `.gitignore` file. Its recommended that you do not check in your bower components, and instead install them locally during development and add installation as a step in your CI/CD process for test, QA, and production environment. This helps ensure your dependencies stay up-to-date as new patches and updates are made available.
4. Run `$ bower install --save px-[compononent-name]` to install components in your app, or `$ bower install —save-dev px-[css-name]` to install SCSS modules in your app.
5. The resulting components will be placed in the `bower_components/` directory in the root of your app by default. Add a `.bowerrc` file to the root of your app with the following JSON to install components somewhere else:

```json
{
  "directory": "./public/assets/bower_components"
}
```

## Import/load components

Many Vue apps use Webpack to handle JavaScript module importing, bundling, style processing, serving files during development, and more.

Webpack generally assumes scripts being imported are formatted as CommonJS module (e.g. they have a `module.exports = …` declaration) or as ESM modules (e.g. they have a `export default …` or similar declaration). Webpack also assumes imported scripts use the Node module resolution system to locate imported sub-dependencies (e.g. all installed modules are in `node_modules` and may or may not be nested, all local modules are resolved using `path.resolve` semantics). Webpack resolves all imports at build time and bundles scripts into a single file or sharded files for the browser, removing these import semantics from the client code.

Predix Design System web components use HTML imports out of the box to import dependencies. Import paths are resolved using the browser’s semantics for relative or absolute paths. Web components assume they are are stored in a single, flat directory beside all their peer dependencies, reflected in the structure of `bower_components/`.

Vue apps have two choices for importing PDS components:

1. Components can be imported inside `.vue` files or other template files compiled by Webpack, and a Webpack plugin can be added to resolve the imports at build time and bundle them. The [polymer-webpack-loader](https://github.com/webpack-contrib/polymer-webpack-loader) project support this path; read the docs for that plugin for more information on how to configure and import components.
2. Components can be imported using traditional HTML imports syntax inside the app’s `index.html` file. Follow the [Walkthrough: Using components](https://www.predix-ui.com/#/about/start-developing) section of the PDS Getting Started Developing Guide for the basics on import syntax. You will also need to configure Webpack to serve `bower_components/` as static resources from the correct path during development, and configure your production deploys to serve `bower_components/` as static resources.

## Add polyfill (optional)

Predix Design System components are built to use native web platform features defined in the web components specifications: Custom Element, Shadow DOM, Templates, and HTML Imports. All browser vendors have committed to supporting these specifications (except HTML imports, which is being replaced). But not all browsers have these features shipped. The past few major releases of Chrome support all web components specs out of the box, and the newest Safari, Firefox, and Edge releases provide support for nearly all spec features, with the rest coming soon.

If your app’s users access it with older browsers or browsers other than newer Chrome releases, you’ll need to load the [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) polyfill. See the documentation in the webcomponentsjs repo for more information on installing and loading the required scripts. Note that the polyfill can be conditionally loaded after feature detection determines the users’ browser needs the polyfills, ensuring that users on new browsers don’t pay a performance penalty to load polyfills for features they already have.

## Send data into components

Predix Design System components expose extensive APIs that allow developers to configure them to meet technical and UX needs. Each component’s API is documented on the design system website. See the [alert message API docs for an example](https://www.predix-ui.com/#/elements/px-alert-message).

Vue makes it easy to send data into web components. Vue templates already use a data-binding syntax to pass data down into Vue components or views:

```html
<!-- In a .vue template -->
<template>
	<some-vue-component v-bind:some-setting="someLocalVar">
	</some-vue-component>
</template>
```

To pass data into a web component, just append `.prop` to this v-bind directive and put it on a web component.

```html
<!-- In a .vue template -->
<template>
	<some-web-component v-bind:some-setting.prop="someLocalVar">
	</some-web-component>
</template>
```

The Vue instance’s `someLocalVar` will be sent into the web component when it is first defined and when it is updated later.

## Respond to component events

Predix Design System components fire events when users interact with them or when their internal data changes in ways the app developer may want to intercept.

*Properties:* Each component’s API documentation page includes a properties section that lists properties that can be set by the developer. Any properties marked as `notify` in the properties section send events when they’re changed.

For example, in [px-alert-message](https://www.predix-ui.com/#/elements/px-alert-message), the `visible` property is a boolean that shows or hides the alert message. If the user taps a button to hide the alert message, visible will be set to `false`. The component will fire a `visible-changed` event, and the event’s `event.detail.value` property will be false.

The change event names for all notifying properties are the property converted from camelCase to dash-case with `-changed` added to the end. The new value is always in `event.detail.value`.

*Rich events:* Components may also expose additional rich events when users interact with them in a way that does not trigger any notifying property changes. These events are documented in the Events section on each component’s API page. The payload for these events may be slightly different: the data they send will be in `event.detail` but may take different shapes. Read the documentation for each event to determine what data is sent.

*Vue syntax:* Web components fire native DOM events. The syntax to bind to these events in Vue template is the same as the syntax to bind to Vue component events:

```html
<!-- In a .vue template -->
<template>
	<some-web-component v-on:some-setting-changed="handleChanged">
	</some-web-component>
</template>
```

The `handleChanged` function will be called on the Vue instance with the event. Check `event.detail.value` if it is a change event, or `event.detail` if its a rich event.

## Style components

Predix Design System components can be themed using CSS custom properties, a new web platform specification that allows native CSS code to consume and set variables.

Each component’s API documentation page includes a list of CSS properties that can be themed to change the look and feel of the component.

Theming still relies on some Polymer-specific shims as the final mechanics of CSS properties are hammered out by the browsers. When CSS custom properties ship, the Polymer shims will be removed and the code will run natively in the browser.

To theme components, its recommended to create a single theme at the app level that makes any desired changes once for all instances of Predix Design System components used in the app. The easiest way to create an app-level theme is to add a style tag like this to the `index.html` of the app:

```html
<custom-style> <!-- wrapper needed for Polymer 2 -->
  <style is="custom-style">
    html {
      --px-component-css-property-name: blue;
    }
  </style>
</custom-style>
```

The design system provides two themes that can be installed via bower and loaded to style all components at once, the [light theme](http://github.com/predixdev/px-theme) and [dark theme](https://github.com/predixdev/px-dark-theme). To use these themes, install the theme with bower, load the theme on the page, and add a style tag like this to the `index.html` of the app:

```html
<!-- Use this for light theme -->
<custom-style>
  <style is="custom-style" include="px-theme-styles"></style>
</custom-style>

<!-- Use this for dark theme -->
<custom-style>
  <style is="custom-style" include="px-dark-theme-styles"></style>
</custom-style>
```

You can fork either of these themes and use it to create your own theme, or load either of these themes and load/provide your own theme below to override a subset of the theme properties.

## Add content inside components

More information coming soon. Please check back.
