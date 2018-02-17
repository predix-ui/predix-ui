---
title: Developing with the Predix Design System
moduleName: view-about-start-developing
pathToRoot: ../../
layout: default
---

# Introduction

Predix UI Components, and the technology they're built on, is not a framework. They're a set of small pieces that can fit into the framework your team chooses to build with. Our components are built to work inside all modern JavaScript frameworks, or to work on their own with no framework at all.

Each one is a web component — a self-contained bundle of HTML, JavaScript, and CSS that looks and works just like a standard HTML tag. In fact, they are standard HTML tags. The technologies used to make web components—Custom Elements and Shadow DOM—are part of the standard web platform just like `<p>` and `<a>` tags.

[Read more about Predix UI Components and how they work in this article.](https://medium.com/ge-design/predix-design-system-components-that-work-everywhere-97b774028b37)

# How To: Predix UI Components &amp; Polymer

## Video: Using components

<div class="video-wrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/y7JH20HkAWg?list=PLibNgo_CBeuujvRV26_uLTksm1ezh7oGd" frameborder="0" allowfullscreen></iframe>
</div>

## Walkthrough: Using components

This guide covers the steps to install a single component, [px-spinner](https://www.predix-ui.com/#/modules/px-spinner/).

### Step 1: Complete the bower install

[Bower](https://bower.io/) is an online repository and package manager of code snippets for the web. You should have a bower.json file in your app (created by using bower init in the command line in your app directory). Adding a bower file to your app means you allow bower to manage your dependencies. Components can be retrieved with bower by using the bower install command. This is the first step to import a Predix UI component into your app.

For example, to install the latest version of the px-spinner component, type the following command into a command line while inside your app directory:

```bash
bower install px-spinner
```

If you'd like to add the installed component to your bower.json file under the dependencies section when you initially install the component, add "–save” to the command as follows:

```bash
bower install px-spinner --save
```

The installed component will now be available in your app's directory under the bower_components/px-spinner directory. [Be sure to read more about bower to make full use of this powerful tool.](https://bower.io/)

Since all of the Predix components are still using Polymer v1.9.0, you will likely be presented with a dependency conflict for the webcomponentsjs dependency. This polyfill ensures that web components will function in older browsers that do not natively support them. The compatible version should be `^0.7.0` (which resolves to `0.7.24` at the time of this writing). You can use `!` to persist this resolution in your bower.json to avoid seeing the conflict in the future.

### Step 2: Import the link

Next, import the Predix UI component and the webcomponents-lite polyfill by using link tags in your HTML code. Here's an example of how to import the px-spinner component:

```html
<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
<link rel="import" href="bower_components/px-spinner/px-spinner.html" />
```

Link tags let the browser recognize a potential shared resource, which means that if another component requests the same component you just imported, the code can just be re-used, and does not need to be fetched again. [For more info, check out this StackOverflow answer.](https://stackoverflow.com/questions/22135095/polymer-element-with-javascript-dependencies)

### Step 3: Use the tag

Now use the tag in your app. Continuing with the example above, use the px-spinner component and insert the following code into your app:

```html
<px-spinner></px-spinner>
```

## Using the API documentation

Every component has an interactive demo and API documentation page. You can find [the documentation for the px-spinner component](http://predix-ui.com/#/modules/px-spinner), and all the rest, on the Predix UI Catalog.

For example, if you look at the px-spinner API, you'll see that it has a "finished” property that can be used to hide it. To hide the px-spinner component, set the "finished” attribute to true, as follows:

```html
<px-spinner finished></px-spinner>
```

The "finished" property can also be set programmatically by finding the component in the DOM, and setting the property directly:

```js
var spinner = document.querySelector('px-spinner');
spinner.finished = true;
```

# Using Predix UI CSS Modules

Build your application with Predix UI CSS to ensure consistent design across your entire application. Use CSS modules to create the base typography, layout, and content design for your project.

* [The "Get started with Predix UI CSS" tutorial](https://docs.predix.io/en-US/content/platform/web_application_development/predix_ui/example-get-started-with-predix-design-system-css-modules) on Predix.io is a great place to start learning about how to use the CSS modules.
* Predix UI CSS is built on the [inuitcss framework](https://github.com/inuitcss). We have added functionality to inuitcss and customized some of its existing methodologies but have attempted to remain faithful to inuitcss' core principles. [Read more about inuitcss](https://github.com/inuitcss) to get familiar with its concepts.
* The [px-getting-started README on Github](https://github.com/predixdev/px-getting-started/) breaks down everything you need to know to use Predix UI CSS modules. Use the guide to get started or refresh your knowledge.

# Build your own components

You can extend your Predix application by creating custom Predix UI components for any use case. To speed things up, use the same generator tool that all Predix UI Components are built with to create your component scaffolding.

* The [generator-px-comp repository on Github](https://github.com/predixdev/generator-px-comp/) hosts a Yeoman generator tool that will create the file structure for new components, install necessary Predix UI CSS modules, and prepare tests. See the repository README for instructions on using the generator.

# Start a new app

Predix UI Web App Starter is a web application starter kit that can be copied, extended and deployed to production immediately. Everything you need is included:

* A project structure to help teams write organized code using Polymer as an application framework
* Example Predix UI Components and CSS modules composed to create a dashboard UI
* Developer tools that speed up the type, save, and reload workflow
* A Node/Express web server ready to connect to Predix services and APIs

Get started with [the "Understanding and Install the Predix Web App Starter" tutorial](https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=2101&tag=All%20Guides&journey=All%20Guides).

<div class="video-wrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/9d6XzgAnyHI?list=PLibNgo_CBeuujvRV26_uLTksm1ezh7oGd" frameborder="0" allowfullscreen=""></iframe>
</div>
