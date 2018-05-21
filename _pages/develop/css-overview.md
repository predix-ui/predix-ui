---
title: CSS Modules Overview
moduleName: view-develop-css-overview
pathToRoot: ../../
layout: default
---


The Predix Design System's CSS modules are a collection of Sass-based repos under the [predixdesignsystem](https://github.com/predixdesignsystem/) org on GitHub. The CSS modules are independent of the design system's components; however, the components use the CSS modules in their Sass. We recommend using the CSS modules and the components in conjunction with each other.

The CSS modules are based off of [inuitcss](https://github.com/inuitcss). Inuitcss is a powerful, Sass-based, BEM, OOCSS framework designed with scalability and performance in mind. Its goal is to help you get started, and then it gets out of your way. It was created by Harry Roberts. The Predix Design System CSS modules are built with the same methodologies as inuitcss. Understanding these methodologies will help you understand and use the CSS modules.

# Single Responsibility Principle
The purpose behind the single responsibility principle is to allow systems to be composable. Things are broken down into their smallest possible parts to ensure each part fulfills its responsibility well. We can then combine responsibilities to create more complex components. This modularity allows for incredible flexibility.

# Preferred Selectors
Both frameworks are based almost exclusively on a class-based architecture. In order to understand why a class-based architecture makes a system easier to work with, we need to understand specificity.

## Specificity
 Specificity is a value that is determined by the selector. The purpose of specificity is to be the tie breaker of which style gets applied to elements. If an element has two or more conflicting property declarations, the one with the highest specificity will win out. If an element has the same specificity, then the declaration that is defined last will win out.
* Elements or pseudo-elements add a value of 0,0,0,1
* Class attributes, attribute selection, or pseudo-classes add a value of 0,0,1,0
* ID attributes add a value of 0,1,0,0
* All inline styles have a value of 1,0,0,0

Examples
```css
p { color: red; } /* 0,0,0,1 */
p .btn { color: orange; } /*  0,0,1,1 */
.btn.btn.btn.btn.btn.btn.btn.btn.btn.btn.btn { color: red; } /*  0,0,11,0 */
#btn { color: purple; } /*  0,1,0,0 */
```

Classes are the preferred selector because they are highly reusable with relatively low specificity. It is also very easy to be descriptive with class names as opposed to multiple elements chained together (e.g. .nav-primary {} is much nicer than header ul {}). It is not recommended to use IDs, as they are very high in specificity and they are not reusable.

Note: Chaining classes together can never over ride the specficty of an ID. This can be seen in the last two examples above. The specficy of 0,0,11,0 is still lower than 0,1,0,0.

# Inverted Triangle CSS
One of the most common problems in CSS is not understanding why an element is getting a specific style. Even with a good understanding of how specificity works, without a well-organized CSS file, it can be nearly impossible to untangle subtree collisions.

We can use the Inverted Triangle CSS architecture (ITCSS) to fully manage every line of CSS in the project. ITCSS is organized with the styles that have the most reach and lowest specificity at the top of a CSS file down to the most explicit and highest specificity declarations. ITCSS works with the cascade and selector specificity; it is performance and scale-oriented out of the box.

<catalog-picture
    img-src="../../img/developer-guides/css-guide/css-guide-inverted-triangle"
    img-alt="Inverted Triangle" caption="The settings, tools, generic, and base layers should remain relatively untouched. The majority of the CSS for a component should reside in the component layer.">
</catalog-picture>

* **Settings**: global variables, site-wide settings, config switches
* **Tools**: site-wide mixins and functions.
* **Generic**: Low-specificity, far-reaching rule sets
* **Base/Elements**: HTML elements
* **Meta**: shortcut libraries with collections of objects (Predix Design System specific)
* **Objects**: design patterns
* **Components**: complete chunks of UI
* **Trumps**: high-specificity, very explicit selectors. Overrides and helper classes

For more details check out [this article](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/).



# Specificity Graph
The specificity graph is a simple model for diagramming the progression of specificity from top to bottom of your CSS file. Since specificity is one of the most troublesome features in CSS, we want to make sure it is as predictable as possible. As we saw above, ITCSS aims to organize the CSS file from lowest specificity at the top to the highest specificity at the bottom. The specificity graph is a graphical representation of this organization. You can see how the different layers of ITCSS fit within the graph.

<catalog-picture
    img-src="../../img/developer-guides/css-guide/css-guide-specficity"
    img-alt="Ideal Secificity Graph" caption="On the x-axis, we plot the location in the stylesheet (line 0 to line 3K), and on the y-axis, we plot the specificity of that selector.">
</catalog-picture>

For more details check out [this article](https://csswizardry.com/2014/10/the-specificity-graph/).


# Make Everything Opt-In
The goal behind making everything opt-in is to allow developers to choose only the CSS they need. It’s easier to opt in to something than it is to undo it. The opt-in method reduces file bloat; the Starter Kit is only 1KB after being gzipped. Additional functionally can be added through configurable flags, but is off by default.

You can see this being implemented in the CSS modules with our Sass flags. If someone wants to use our button styles, they have to import the button scss file into their Sass.
`@import 'px-buttons-design/_objects.buttons.scss';`This will import only the base button style. If you look inside [px-buttons-design/_objects.buttons.scss](https://github.com/predixdesignsystem/px-buttons-design/blob/master/_objects.buttons.scss), anything that is wrapped in an `@if` will be ignored unless the flag is set to true above the `@import` statement. It is necessary for the flag to be set to `true` above the import so that the flag is true at the point in time when the scss file is parsed.
```css
$inuit-enable-btn--primary : true;
@import 'px-buttons-design/_objects.buttons.scss';
```
In the example above, the `$inuit-enable-btn--primary` flag is set to `true`. The styles in the
```css
@if ($inuit-enable-btn--primary == true) {
  .#{$inuit-btn-namespace}btn--primary,
  %#{$inuit-btn-namespace}btn--primary {
    border-color: $inuit-btn-primary-border-color;
    box-shadow: $inuit-btn-shadow;
    background-color: $inuit-btn-primary-background;
    ...
  }
}
```
will now be included in the css file. This opt-in approach makes it so the CSS file size can stay as small as possible. You can see all the other button configurations and their flags on the [Predix Design System site](#/css/visual/buttons/px-buttons-design).



# BEM
BEM is a front-end naming methodology that stands for block, element, and modifier. The purpose of BEM is to tell other developers more about what a piece of markup is doing. It can be verbose, but it is friendly to developers that are new to the project. Absolutely everything is either a Block, an Element, or a Modiﬁer.

Block - The root of a piece of UI. It is a self-contained starting context and can have any number of Elements or Modifiers  associated with it.
```css
/* Block */
.panel {}
.person {}
```

Element - Denoted by two underscores. A descendent, component part of a Block. An element inherits styes. It can also carry Modifiers.
```css
/* Element */
.panel__title {}
.person__hand {}
```

Modifier - Denoted by two hyphens. A variation of a Block or Element. These extend styles.
```css
/* Modifier */
.panel--large {}
.person__hand--female {}
```


# Base Spacing Unit
The purpose of a base spacing unit is to keep everything consistent visually and in code. Everything is based around it. In the CSS modules we have a spacing system based on multiples of 5. This is defined in [px-defaults-design/_settings.defaults.scss](https://github.com/predixdesignsystem/px-defaults-design/blob/master/_settings.defaults.scss)

```css
$inuit-base-spacing-unit : 15px
$inuit-base-spacing-unit—tiny : 5px
$inuit-base-spacing-unit—small : 10px
$inuit-base-spacing-unit—large : 20px
$inuit-base-spacing-unit—huge : 30px
```

# Layout Systems
Objects shouldn’t care where they live; they should never carry layout rules. This allows the objects to be highly reusable and predictable. Use an abstracted meta-system to lay objects out. For example a button should not care where it lives.

The main partials we have for layout are `px-spacing-design`, `px-layout-design`, and `px-flexbox-design`.

## `px-spacing-design`
is a set of utility classes used to add margin and padding to individual elements, and also set up in multiples of 5 to match the base spacing unit. Spacing design can be confusing to read at first, but once you know the syntax, it is easy to use. The class names are broken up into type, direction, size, and positive/negative values.

* **type**: `m` Margin, or `p` Padding
* **direction**: `t` Top, `r` Right, `b` Bottom, `l` Left, `h` Horizontal, `v` Vertical, or omitted for All directions
* **size**: can be `0` None, `--` Tiny, `-` Small, omitted for regular, `+` Large, or `++` Huge
* **negative**: `-` Negative, or omitted for positive (note: paddings must always be positive)

All spacing classes start with `u-` which just mean it is a utility class, a holdover from inuitcss.

`u-mt+` means margin, top, large. It will add a 20px top margin to whatever element it is placed on.

`u-p0` means padding, all around, none. It will add zero padding around the entire element.

You can check all possible configurations and what flags need to be enabled in the [documentation](#/css/layout/px-spacing-design).

## `px-layout-design`
is a powerful, flexible alternative to the traditional grid system, built using flex. The number of `.layout__items` inside of each `.layout` will flexibly resize if the viewport changes. You do not need to set widths on `.layout__item`s for the grid to function. However, if you wish, you can override default grid behavior by assigning widths to layout items with the classes found in `px-widths-design`. For some examples, check out the [documentation](#/css/layout/px-layout-design).
If IE doesn’t need to be supported, then CSS grid would also be a good solution, though there is no CSS partial for grid in the Predix Design System at this time.

## `px-flexbox-design`
 exposes many features available in flexbox layouts with simple, easy-to-use classes. Not all the classes are named the same as the corresponding CSS flexbox properties. You can check out all of the classes and their flexbox equivalents in the [documentation](#/css/layout/px-flexbox-design).



# Additional resources
This is a high-level overview of what we think are the most important ideas to understand when using the Predix Design System CSS modules. For more resources check out the links below.
* [inuitcss Getting Started](https://github.com/inuitcss/getting-started)
* [Harry Roberts Presentation on ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4)
* [Selectors](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/)
* [ITCSS (inverted triangle)](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
* [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
* [Namespacing](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
* [BEM Mixes](https://en.bem.info/forum/4/)
* [Flexbox videos](http://flexbox.io/)
* [Modular CSS](http://csswizardry.com/2015/03/can-css-be-too-modular/)
* [Object Oriented CSS (OOCSS)](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

More CSS resources:
* [Parker - stylesheet analysis tool](https://github.com/katiefenn/parker)
* [PX, EM or REM](https://zellwk.com/blog/media-query-units/)
* [Extend vs Mixin](http://csswizardry.com/2016/02/mixins-better-for-performance/)
* [CSS Triggers](https://csstriggers.com/)
* [scss-lint](https://github.com/brigade/scss-lint)
* [Compressive Images](https://www.filamentgroup.com/lab/compressive-images.html)
* [Performance Quality](https://www.webpagetest.org/)

If you want more information by Harry Roberts, check out [https://twitter.com/csswizardry](https://twitter.com/csswizardry) and [http://csswizardry.com/archive/](http://csswizardry.com/archive/)
