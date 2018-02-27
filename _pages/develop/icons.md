---
title: <px-icon icon="px-fea:deployments"></px-icon> Use icons
moduleName: view-develop-icons
pathToRoot: ../../
otherImports: |
    <link async rel="import" href="../../bower_components/px-icon-set/px-icon.html">
    <link async rel="import" href="../../bower_components/px-icon-set/px-icon-set-object.html">
    <link async rel="import" href="../../bower_components/px-icon-set/px-icon-set-feature.html">
layout: default
---

This guide addresses how to use icons in the Predix Design System.

# <px-icon icon="px-fea:home"></px-icon> Getting started

To start using the Predix Design System icons, you should first check out all the available icons on our site [here](https://www.predix-ui.com/#/elements/px-icon-set).

The site shows each icon along with its full name, the set it belongs to, and its optimized size. While possible to change the size of the icon from its optimized size, they were designed to be used at the specified size and may not look as good at a different size. Our Design recommendation is to NOT change the size of the icon and instead, either use a different icon, or request an new optimized icon. Consult with your designers.

# <px-icon icon="px-fea:microservice"></px-icon> Upgrading Px components
If you want to specify icons for Predix Design System components, follow the specific instructions on each component. In general, you'll want to replace the Font Awesome name with the full icon names, listed next to each icon on our website, such as, `px-obj:airplane`. Some components may require you to break up the name into a `set` and an `icon`. The set is the first part of the string before the colon (`px-obj`) and the icon name is the second part (`airplane`).

# <px-icon icon="px-fea:products"></px-icon> Using icons in your app/component
If you're upgrading, the first step is to remove `px-polymer-font-awesome` from your bower and remove all imports for `px-polymer-font-awesome.html`. `px-icon-set` replaces `px-polymer-font-awesome`, so you will not be able to have both.

To use the Predix Design System icons in your own app or component, you'll want to add `px-icon-set` to your bower dependencies.

``` js
"px-icon-set": "^2.0.0"
```

The `px-icon-set` will install all the icon sets and a `px-icon` component used to actually display the icons. You can choose the specific sets you want to incude, such or just import them all with `px-icon-set.html`.

Example only importing feature and navigation sets:
```html
<link rel="import" href="../px-icon-set/px-icon-set-feature.html" />
<link rel="import" href="../px-icon-set/px-icon-set-navigation.html" />
```

Example only importing all sets:
```html
<link rel="import" href="../px-icon-set/px-icon-set.html" />
```

You'll also want to import the `px-icon` component
```html
<link rel="import" href="../px-icon-set/px-icon.html" />
```

With a set and the icon component imported, you can now use the `px-icon` component display an icon <px-icon icon="px-obj:airplane"></px-icon>
```html
<px-icon icon="px-obj:airplane"></px-icon>
```

# <px-icon icon="px-obj:automobile"></px-icon> Under the hood
The `px-icon-sets` are a type of `iron-iconset-svg` and `px-icon` is a wrapper around `iron-icon` providing styling and sizing of the icon. To learn more about these, check out Polymer's docs on them: [iron-icon](https://www.webcomponents.org/element/PolymerElements/iron-icon/) and [icon-icon-set](https://www.webcomponents.org/element/PolymerElements/iron-iconset-svg)

Using `iron-iconset-svg` you can also create your own icons and use them in your app.

Since our icon sets are relying on `iron-icon`, you can just use `iron-icon` to display our icon sets. However, `px-icon` provides several customizations on top of `icon-icon`: first, `iron-icon` by default has a fill and no stroke; second, `px-icon` auto-sizes the icon to its optimized size, which `iron-icon` does not.

<style>
.custom-styling {
  color: #fdc52e;
  --iron-icon-width: 28px;
  --iron-icon-height: 28px;
  --iron-icon: {
    stroke-width: 0.75;
  }
}
</style>
# <px-icon class="custom-styling" icon="px-utl:edit"></px-icon> Custom styling
You can change the color of `px-icon` via the color CSS property. However, other property changes will require CSS variables. Since `px-icon` uses `iron-icon`, if you want the ability to do more styling, you can just use the `icon-icon` css variables listed in their docs.

Here is an example:
<style>
.custom-icon {
  color: #bae;
  --iron-icon-width: 100px;
  --iron-icon-height: 100px;
  --iron-icon: {
    stroke-width: 0.6;
  }
}
</style>
<px-icon class="custom-icon" icon="px-obj:gas-turbine"></px-icon>
```css
.custom-icon {
  color: #bae;
  --iron-icon-width: 100px;
  --iron-icon-height: 100px;
  --iron-icon: {
    stroke-width: 0.6;
  }
}
```
```html
<px-icon class="custom-icon" icon="px-obj:gas-turbine"></px-icon>
```

Note, the width and height were changed by way of example, but it is not recommended to tinker with the size. Since we did change the width and height, the line weight of the icon got scaled up and was too thick, so to compensate, we use the `--icon-icon` mixin to reduce the `stroke-width`.

# <px-icon icon="px-obj:imaging-machine"></px-icon> Requesting new icons
If you have an idea for a new icon, please feel free to to log a Github issue on the `px-icon-set` repo.

<!--
should link to the social icons set, but cheating to avoid a) adding as a dependency for this one silly demo, 2) setting up a CDN that may or may not be reliable, 3) path issues with their links if I did do a CDN.

blatantly stolen from : https://github.com/PolymerElements/iron-icons/blob/master/social-icons.html
-->
<!--
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
-->
<iron-iconset-svg name="social" size="24">
<svg><defs>
<g id="cake"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/></g>
<g id="pages"><path d="M3 5v6h5L7 7l4 1V3H5c-1.1 0-2 .9-2 2zm5 8H3v6c0 1.1.9 2 2 2h6v-5l-4 1 1-4zm9 4l-4-1v5h6c1.1 0 2-.9 2-2v-6h-5l1 4zm2-14h-6v5l4-1-1 4h5V5c0-1.1-.9-2-2-2z"/></g>
</defs></svg>
</iron-iconset-svg>

<style>
.companion-cube {
  --iron-icon-width: 32px;
  --iron-icon-height: 32px;
  --iron-icon: {
    stroke-width: 0.7;
  }
}
</style>

# <px-icon class="companion-cube" icon="social:pages"></px-icon> Using non-px icons
You can also use non-px icons with the `px-icon` component or `iron-icon`, such as Polymer's [iron-icons](https://www.webcomponents.org/element/PolymerElements/iron-icons). Just bring them into your project and use them like you would use a Px icon. Note that since the `px-icon` component uses a stroke instead of a fill, some iron-icons may not work great, having been designed with a fill. In this case, consider just using `iron-icon`.


```css
.the-cake-is-a-lie {
  color: #2AD;
  --iron-icon-width: 50px;
  --iron-icon-height: 50px;
  --iron-icon: {
    stroke-width: 0.5;
  }
}
```
```html
<px-icon class="the-cake-is-a-lie" icon="social:cake"></px-icon>
```
<style>
.the-cake-is-a-lie {
  color: #2AD;
  --iron-icon-width: 50px;
  --iron-icon-height: 50px;
  --iron-icon: {
    stroke-width: 0.5;
  }
}
</style>
<px-icon class="the-cake-is-a-lie" icon="social:cake"></px-icon>
