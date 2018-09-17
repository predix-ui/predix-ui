---
title: Design Starter Kit
moduleName: view-about-start-designing
pathToRoot: ../../
layout: default
---

The Starter Kit Sketch stencil contains the most common components and pre-configured page layouts in both light and dark themes used in Predix applications. It relies on the use of symbols and symbol overrides to allow for quick assembly of components in supported configurations.

<a href="https://github.com/predixdesignsystem/predix-design-stencil"><button class="btn btn--primary">Download the Starter Kit</button></a>


# How to use the Starter Kit

## Adding Sketch Libraries

*Note: Sketch Libraries are only available with Sketch 47 and above.*

To start using the Predix Components Master Library, you will need to clone this repository to your local environment and link the library to your file. You can follow [these instructions](https://help.github.com/articles/cloning-a-repository/) to clone this repository in your local environment.

**Do not edit the local copy of the Predix Components Master file.** If you are creating symbols, be sure to create symbols from a separate file that links to the library. Any changes to the local copy of the Predix Components Master will need to be discarded when fetching any updates.

To add Predix Components Master as a Library, first open your preference window and go to the Libraries tab. Click on the “Add Library…” button that appears on the bottom right of the preference window, and choose the document from the cloned repository. Once you've added Predix Components Master as a Library, you will now be able to insert its Symbols into any of your documents.

<catalog-picture img-src="../../img/guidelines/sketch-preference" img-alt="Sketch preferences"></catalog-picture>

Once you've added Predix Components Master to your Libraries, you can use the symbols to build symbols for your own Libraries or for your local documents. The Predix Components will appear in its own menu item within the symbols option.


<catalog-picture img-src="../../img/guidelines/insert-symbol" img-alt="Insert symbol"></catalog-picture>

If you are looking for more information about how Libraries work, you can find documentation [here](https://sketchapp.com/docs/libraries/)

## Updating and Syncing Libraries
We will announce any updates to the Predix Components Master. In order for you to gain access to the updates, you will need to fetch the latest file via Github. Open the Github desktop client and fetch the latest version by clicking on "Fetch origin" in the upper right. Fetching the origin will update your local copy to the latest version.

<catalog-picture img-src="../../img/guidelines/fetch-origin" img-alt="Fetch origin"></catalog-picture>

## Using the Starter Kit
The Starter Kit will have the components from the Predix Components Master, components that have not been converted to symbols, and sample layouts. Use the Starter Kit to create symbols or pages for your product and applications. Create or save a copy of the Starter Kit. Be sure to create or save a copy outside of the local Github repo.

## Integrating the Predix Components Master Library
If you've used previous versions of the Starter Kit to build your screens, you will need to replace your symbols with those that are in the Libraries file. [Symbol Swapper](https://github.com/sonburn/symbol-swapper) is a plug-in that will help to streamline this process. Symbol Swapper provides you with a way to select a symbol and replace it with a symbol with the same name.
<catalog-picture img-src="../../img/guidelines/symbol-swapper" img-alt="Symbol swapper"></catalog-picture>

## Adding the Predix Color Swatches to Sketch
The design starter kit includes the *Predix Design System Swatches v2.clr file*. You can setup Sketch to use the Predix color palette as part of the Colors panel.

1. In sketch, open the colors panel by going to View > Show Colors
<catalog-picture img-src="../../img/guidelines/open-colors-panel" img-alt="Opening the colors panel"></catalog-picture>

The panel will show some pre-set colors from Sketch and others you might have in your system.

2. Add the swatches file to your library by clicking on the gear icon > and then Open.
<catalog-picture img-src="../../img/guidelines/open-clr-file" img-alt="Open clr file"></catalog-picture>

Select the *Predix Design System Swatches v2.clr file* file and click open.
<catalog-picture img-src="../../img/guidelines/select-clr-file" img-alt="Select clr file"></catalog-picture>

3. You will now have the swatches available in your library for use whenever the colors panel is open.
<catalog-picture img-src="../../img/guidelines/swatches-visible-in-panel" img-alt="Clr file visible in panel"></catalog-picture>

You can switch between the swatches in your system by clicking the swatches name dropdown and selecting an option.
<catalog-picture img-src="../../img/guidelines/switching-between-swatches" img-alt="Switch between swatches"></catalog-picture>

# Additional Third-party Resources

* [Sketch App](https://www.sketchapp.com/)
* [Unleashing The Full Potential Of Symbols In Sketch](https://medium.com/sketch-app-sources/sketch-symbols-b36f7355414a)
* [Eight Shapes Contrast Grid](http://contrast-grid.eightshapes.com/)
* [Sketch Runner Plug In](http://sketchrunner.com/)
