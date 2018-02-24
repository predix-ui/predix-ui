---
title: Everything You Always Wanted to Know About Stacking Contexts* (*But Were Afraid to Ask)
moduleName: view-develop-stacking-context
otherImports: |
    <link defer rel="import" href="../../bower_components/px-modal/px-modal.html">
    <link defer rel="import" href="../../bower_components/px-modal/px-modal-trigger.html">
    <link defer rel="import" href="../../bower_components/px-dropdown/px-dropdown.html">
pathToRoot: ../../
layout: default
---

# The Problem

First, to understand the basics of stacking contexts, what they are, and how they get created, please check out the great MDN docs here: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context" target="_blank">https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context</a>

### TLDR;?

They have a nice picture, but ok, their summary:
* Stacking contexts can be contained in other stacking contexts, and together create a hierarchy of stacking contexts.
* Each stacking context is completely independent from its siblings: only descendant elements are considered when stacking is processed.
* Each stacking context is self-contained: after the element's contents are stacked, the whole element is considered in the stacking order of the parent stacking context.

What this means practically is that once you have created a stacking context, descendent elements are trapped in that stacking context and it is very hard to get out of it.

Some common examples of when this is a problem are with modals or other floating elements that either appear below content which they should cover or are being cut off by their stacking parent. Here is an example of dropdown being trapped in the modal's stacking context:

<px-modal header-text="This is a modal" accept-text="Close" reject-text="Close" open-trigger="[[trigger]]">
  <div style="margin-left:25px; margin-right:25px;" slot="body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt labore, tenetur maiores eos aut explicabo. Soluta eaque illum, repudiandae, minus nesciunt itaque, aperiam consequuntur explicabo voluptatum veniam eveniet debitis vel.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt labore, tenetur maiores eos aut explicabo. Soluta eaque illum, repudiandae, minus nesciunt itaque, aperiam consequuntur explicabo voluptatum veniam eveniet debitis vel.</p>
    <px-dropdown
      items='[{"key":"1","val":"iPhone"},{"key":"2","val":"Android"},{"key":"3","val":"Blackberry"},{"key":"4","val":"I am a menu item so I cannot be selected","disableSelect":true},{"key":"5","val":"Flip Phone","disabled":true}]'>
    </px-dropdown>
  </div>
</px-modal>
<px-modal-trigger trigger="{{trigger}}">
  <button class="btn" class="btn">Open Modal</button class="btn">
</px-modal-trigger>


In some cases, these elements are siblings and just need different z-indexes. If you are using the Predix Design System, we use the following z-index scheme:

<catalog-picture img-src="../../img/guidelines/design/elevation-layering/shadow_scale" img-alt="shadow scale"></catalog-picture>

In other cases, where an element is a descendent of something that created a new stacking context, that element is trapped in the stacking context and has to be dealt with in a different way.

If you find yourself in a stacking context trap, the best solution is to place elements outside the stacking context. In other words, avoid the trap altogether. Otherwise, all attempts to solve the issue is a hack of one sort or another and it is far better to avoid the situation if you can than to add a hack.

Consider if you really need to create a stacking context in the first place?  If so, can you move child elements demonstrating the stacking context issue to a different part of your DOM outside of the stacking context? Why not?

If you are truly stuck with your stacking context trap, then the `px-overlay` repo is here to help and the rest of this guide will explain how to use it in different scenarios.

# Hoisting Predix Design System Components

If you are using the following Predix Design System components:
* `px-dropdown`
* `px-rangepicker`
* `px-datetime-picker`

These use px-overlay components internally. To activate it, add the `hoist` property to the component. You should also read below to understand how to set up a `px-overlay-container`.

# px-overlay

What the `px-overlay` components do is take your elements trapped in your stacking context and hoist them up the DOM, outside of your stacking context so that they may be displayed visually over your stacking context elements. Here is that same modal/dropdown demo but hoisting the dropdown:

<px-modal header-text="This is a modal" accept-text="Close" reject-text="Close" open-trigger="[[trigger2]]">
  <div style="margin-left:25px; margin-right:25px;" slot="body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt labore, tenetur maiores eos aut explicabo. Soluta eaque illum, repudiandae, minus nesciunt itaque, aperiam consequuntur explicabo voluptatum veniam eveniet debitis vel.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt labore, tenetur maiores eos aut explicabo. Soluta eaque illum, repudiandae, minus nesciunt itaque, aperiam consequuntur explicabo voluptatum veniam eveniet debitis vel.</p>
    <px-dropdown
      hoist
      items='[{"key":"1","val":"iPhone"},{"key":"2","val":"Android"},{"key":"3","val":"Blackberry"},{"key":"4","val":"I am a menu item so I cannot be selected","disableSelect":true},{"key":"5","val":"Flip Phone","disabled":true}]'>
    </px-dropdown>
  </div>
</px-modal>
<px-modal-trigger trigger="{{trigger2}}">
  <button class="btn">Open Modal</button>
</px-modal-trigger>

There are two components in `px-overlay`:
* `px-overlay-content`: a holder for elements which you want to get hoisted up the DOM
* `px-overlay-container`: a container which resides outside your stacking context to hold the hoisted elements

## px-overlay-container

Ideally, you should add a `px-overlay-container` just outside your stacking context trap to catch your content. If you do not add one, then one will be created at the body level and your content will be added there.

`px-overlay-container` has a few optional properties:
* `z-index`: by default, it has a z-index of 1250 which should put it above everything in the Predix Design System. The `--px-overlay-container-z-index` CSS variable will allow you to customize the z-index of the container.
* `containerType`: this is a string which allows you to specify which content should hoist to which container. Both content and container have this property and a container will only accept content from a `px-overlay-content` with a matching `containerType`.

### Basic Usage:

```html
<div>
  <px-overlay-container type="foo"></px-overlay-container>
  <div id="stackTrap">
    <px-overlay-content type="foo">
      <div id="stuffToHoist">I will go up the DOM</div>
    </px-overlay-content>
  </div>
</div>
```

## px-overlay-content

`px-overlay-content` is a wrapper for the elements you want to hoist up the DOM out of your stacking context trap. Depending what you want to do, this can be normal HTML elements or might need to be a web component.

`px-overlay-content` optional properties:
* `hoist`: Boolean, true by default. Most likely you are choosing to use `px-overlay-content` because you want to hoist the content up. However, if you are using it within another component, you may want to optionally hoist it up, such as our Predix Design components.
* `eventNames`: An array of events which should get refired in the original location. Since we have physically moved the content from one part of the DOM to another, events will no longer propagate up through the same elements as before. To mitigate this, the `px-overlay-container` will register event listeners for events in `eventNames`. When one of these events is caught, it will refire the event from the original location. The thing to be aware of is that although the `detail` of that event will be the same, the target, path, etc will be different and start only from `px-overlay-content`. To get the full path or rootTarget, the original event which is caught by the container is available on the new event at the `sourceEvent` property. If you need just the rootTarget, look at the `sourceEvent`. If you need the full path, you’ll have to combine the paths from the new event with the event.sourceEvent paths.
* `containerType`: this is a string which allows you to specify which content should hoist to which container. Both content and container have this property and a container will only accept content from a `px-overlay-content` with a matching `containerType`. If a matching container is not found, one will be created at the document body.

### Basic Usage:
The usage for `px-overlay-content` is pretty straightforward. Whatever you want to get hoisted up is a child of the component.

```html
<div>
  <px-overlay-container type="foo"></px-overlay-container>
  <div id="stackTrap">
    <px-overlay-content type="foo" >
      <div id="stuffToHoist" class="myStyles">I will go up the DOM</div>
    </px-overlay-content>
  </div>
</div>
```

In this example, the `div#stuffToHoist` will be moved up into `px-overlay-container`. If you were to look in your inspector, you would see:

```html
<div>
  <px-overlay-container type="foo">
    <div id="overlayHost">
      <div>
        <div id="stuffToHoist" class="myStyles">I will go up the DOM</div>
      </div>
    </div>
  </px-overlay-container>
  <div id="stackTrap">
    <px-overlay-content type="foo" >
    </px-overlay-content>
  </div>
</div>
```

# How to use px-overlay-content

## Styles

The issue you may run into when hoisting HTML elements is that the styles may no longer be applied. Since you have moved the element to a different position in the DOM, styles that are not out of scope or have specific paths may no longer apply. For example:

```css
  #stackTrap {
    font-family: papyrus;
  }

  #stackTrap .myStyles {
    color: salmon;
  }

  .myStyles {
    font-size: 24px;
  }

```

If these styles were declared at the body, originally, all three styles would apply to the `#stuffToHoist` div. It would inherit the `font-family` from `#stackTrap`; as a descendent of `#stackTrap`, it had the proper relationship to get the font `color`, and it has the class to get the `font-size`. However, after moving, it can no longer get the `font-family` nor the `color`. Only the `font-size` would apply.

In situations where you are within a shadow-root, then you’d loose the styles altogether as the styles are encapsulated within the shadow-root and the hoisted content may be outside.

To solve this, you have two options:
1) change your CSS so that it applies to `#stuffToHoist` regardless of DOM position (or use inline styles on `#stuffToHoist`).
2) Change this to a web component so the styles will travel with the HTML element. (BEST)

### Example of using a web component:

```html
<dom-module id="my-content-to-hoist">
  <template>
    <style>
      .myStyles {
        font-size: 24px;
        color: salmon;
        font-family: papyrus;
      }
    </style>
    <div id="stuffToHoist" class="myStyles">I will go up the DOM</div>
  </template>
</dom-module>
```

```js
  Polymer({ is: "my-content-to-hoist" });
```

## Slotted content

Similar to styling, slotted content causes an issue when trying to hoist content up the dom. This is due to the way browsers treat slots and light DOM content gets placed in slots.

To cause light dom content to travel up the DOM, you will have to wrap it in a web component. For example, `px-modal` allows slotted content. Normally you would might write it like this:

```html
<px-modal
  open-trigger="{{openTrigger}}"
  reject-text="Abort"
  accept-text="Starman">
  <h1 slot="header">My Custom Title</h1>
  <div slot="body">
    <p>My custom body</p>
    <px-icon icon="px-fea:deployments"></px-icon>
  </div>
</px-modal>
```

If you wrap the `px-modal` tag in `px-overlay-content`, then the modal would be hoisted up the DOM, but the custom header and body would not, leaving an empty modal.

To fix this, wrap it in a web component:

```html
<dom-module id="example-wrapped-modal">
  <template>
    <px-modal
      open-trigger="{{openTrigger}}"
      reject-text="Abort"
      accept-text="Starman">
      <h1 slot="header">My Custom Title</h1>
      <div slot="body">
        <p>My custom body</p>
        <px-icon icon="px-fea:deployments"></px-icon>
      </div>
    </px-modal>
  </template>
</dom-module>
```

```js
  Polymer({ is: 'example-wrapped-modal' });
```

and then wrap this new component in `px-overlay-content`:

```html
<px-modal-trigger trigger="{{openTrigger}}">
  <button>Open Modal</button>
</px-modal-trigger>
<px-overlay-content event-names='["px-modal-rejected", "px-modal-accepted", "px-modal-dismissed"]'>
  <example-wrapped-modal open-trigger="[[openTrigger]]"></example-wrapped-modal>
</px-overlay-content>
```

## Dynamic Content

Adding dynamic content works fine in Polymer 2. Polymer 1 is a complicated story.

Using a dom-repeat like this:

```html
<px-overlay-content>
  <template is="dom-repeat" items="[[myItems]]">
    <p>[[item]]</p>
  </template>
</px-overlay-content>
```
`items` will be appended into the `px-overlay-container` in Polymer 2.x and Polymer 1.x with Shadow DOM. Polymer 1.x in Shady DOM will not work. To make it work, wrap the dom-repeat in an element:

```html
<px-overlay-content>
  <div>
    <template is="dom-repeat" items="[[myItems]]">
      <p>[[item]]</p>
    </template>
  </div>
</px-overlay-content>
```
This now works in all scencarios.

If instead you are appending dynamic content manually like so:

```html
<px-overlay-content>
</px-overlay-content>
```

```js
  const overlay = document.querySelector('px-overlay-content');
  const elem = document.createElement('div');
  elem.textContent = 'hello';

  overlay.appendChild(elem);
```

This again, works fine in Polymer 2, but fails in Polymer 1.x in both Shadow and Shady DOM. The solution is the same as before, wrap it in a div.

```html
<px-overlay-content>
  <div id="wrapper"></div>
</px-overlay-content>
```

```js
  const wrapper= document.querySelector('#wrapper');
  const elem = document.createElement('div');
  elem.textContent = 'hello';

  wrapper.appendChild(elem);
```

This now works in all scenarios.
