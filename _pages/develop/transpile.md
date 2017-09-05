---
title: Transpile ES6
moduleName: view-transpile
pathToRoot: ../../
layout: default
---

Some Predix Design System components use EcmaScript 2015 (aka ES6) JavaScript features. If users are accessing your app from browsers that do not support ES6 you will need to add a new transpilation step to your build process.

# ES6 browser support
The following browsers support the ES6 features used in Predix Design System components [1]:

* Chrome or Chromium version 49 or later
* Safari or Mobile Safari 10 or later
* Edge 15.15063 or later
* Firefox 51 or later

All other browsers require code transpilation to parse ES6 components, including: Internet Explorer 11, Safari 8-9, and older versions of Chrome, Firefox, Edge, and Mobile Safari.

# ES6 components
The following components are built using ES6 features[1]:

* [px-app-header](https://www.predix-ui.com/#/elements/px-app-header)
* [px-app-nav](https://www.predix-ui.com/#/elements/px-app-nav)
* [px-accordion](https://www.predix-ui.com/#/elements/px-accordion)
* [px-branding-bar](https://www.predix-ui.com/#/elements/px-branding-bar)
* [px-breadcrumbs](https://www.predix-ui.com/#/elements/px-breadcrumbs)
* [px-context-browser](https://www.predix-ui.com/#/elements/context-browser/px-context-browser)
* [px-map](https://www.predix-ui.com/#/elements/map/px-map)
* [px-slider](https://www.predix-ui.com/#/elements/px-slider)
* [px-toggle](https://www.predix-ui.com/#/elements/px-toggle)
* [px-tree](https://www.predix-ui.com/#/elements/px-tree)

# How to transpile apps
ES6 code includes new JavaScript language features that do not run natively on older browsers. Transpilation is the process of converting this code to equivalent ES5 code that can run on older browsers. These conversions include transforming new syntax styles to compatible old styles (e.g. arrow functions, const/let declarations), adding polyfills for new language features that didn’t exist in ES5 (e.g. Map, WeakMap, Set, WeakSet), and extending existing standard prototypes to add new behaviors (e.g. Array.from).

Transpilation happens during the build process before an app is pushed into production. Transpilation can be run as a development task to allow realtime testing of code on non-ES6 browsers during development. The best tools and approach to use depend on your existing build process and the framework you’ve chosen to build your app.

## With polymer-cli
Google’s Polymer team make the [polymer-cli](https://www.polymer-project.org/2.0/docs/tools/polymer-cli), a robust command-line utility that can be used to add transpilation to build and development pipelines.

The polymer-cli tool should be used for the following apps:

* Apps based on the [predix-webapp-starter](https://github.com/predixdev/predix-webapp-starter) or  its predecessor, px-seed
* Apps built using Polymer as a framework (e.g. from the Polymer starter kit)
* Apps with separate a separate repository or folder of Polymer elements that are built separately from the main app

To use polymer-cli, you will need to install the polymer-cli with NPM and add a [polymer.json](https://www.polymer-project.org/2.0/docs/tools/polymer-json) file to your application. See the resources section below for more help with these steps.

Two polymer-cli commands are available to help with transpilation: *build* to transpile code before pushing to production, and *serve* to transpile code in realtime during development. Run `$ polymer build` or `$ polymer serve` in your shell to use these commands. If you already use a task runner like Gulp, you can also run these commands as part of your existing tasks. See the [predix-webapp-starter Gulpfile](https://github.com/PredixDev/predix-webapp-starter/blob/master/gulpfile.js) for an example.

The following resources are available to help with installing and configuring polymer-cli:

* Documentation: [Using the Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli)
* Documentation: [Configuring your polymer.json file](https://www.polymer-project.org/2.0/docs/tools/polymer-json)
* Documentation: [ES6 and compilation to ES5](https://www.polymer-project.org/2.0/docs/es6)
* Example: default predix-webapp-starter configuration
	* [Gulp task to run polymer-cli build](https://github.com/PredixDev/predix-webapp-starter/blob/master/gulpfile.js)
	* [polymer.json file](https://github.com/PredixDev/predix-webapp-starter/blob/master/polymer.json)

## With a custom build tools
If your app uses custom build tools like webpack you can configure your tools to transpile the Predix Design System components. Most build tools use [babel](https://babeljs.io/) to transpile code. You’ll need to figure out the recommended way to setup babel or another transpilation library in your build tools.

You should be aware of the following things when you configure your build tools[1]:

* Polymer requires all ES6 features except modules
* You must compile all the Predix Design System components, the Polymer library, and any third-party elements you're using, but not the polyfills

The following resources are available to help with configuring custom build tools:

* Tutorial: [How to use Polymer with Webpack](http://robdodson.me/how-to-use-polymer-with-webpack/)
* Tool: [polymer-webpack-loader: WebPack Loader for Polymer Web Components](https://github.com/webpack-contrib/polymer-webpack-loader)
* Tool/Example: [polymer-build: A set of structured Gulp tasks that are used under the hood in the polymer-cli to transpile code](https://github.com/Polymer/polymer-build)

# Why we use ES6 features
ES6 introduced many new JavaScript language features that increase developer productivity, code quality, and extensibility. Some features, like `const` and `let` for block scoped variable definition, protect against writing code that could create unexpected problems in production. Even when code like this is transformed back to its ES5 equivalent without the same protections, the compiler will find the issues and throw an error.

Additionally, the web components Custom Element v1 specification recommends using the `class` keyword to define elements. Our components don’t yet use the `class` keyword to define themselves, but we expect to introduce that in the near future when as we upgrade.

---------------------

[1] Thanks to the Polymer Authors and the [ES6 and compilation to ES5](https://www.polymer-project.org/2.0/docs/es6#compile) documentation for this information.
