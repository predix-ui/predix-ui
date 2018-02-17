---
title: Internationalization
moduleName: view-develop-internationalization
otherImports: |
    <link defer rel="import" href="../../bower_components/px-accordion/px-accordion.html">
pathToRoot: ../../
layout: default
---

Most Predix Design System components can be localized, using one or more of the three following methods: localizing text, localizing date and time; and localizing number formatting. The Predix Design System does not provide translations for strings, only the hooks for you to provide your own translated resources.

## Localizing component strings
In order to localize strings in Predix components you will need to pass down two properties to the components: `language` and `resources`.

The `resources`property should be an object in which each key is a language code that will match the `language` property. The value for each language key is a nested object, in which each key is the string to be translated and each value is the translated string.

Example `resources` object:
```json
{
 'en': {
  'Apply': 'Apply',
  'Cancel': 'Cancel'
 },
 'fr: {
  'Apply': 'Appliquer',
  'Cancel': 'Annuler'
 }
}
```


The `resources` property only needs to hold the language you currently use, but can include as many languages as you want. A specific component's `resources` property needs to hold all its strings **as well as all the strings of any internal subcomponents it uses**. Determining what subcomponents a component uses, and what strings it should have, can be tricky. We recommend that you create one big `resources` object containing
every string needed for all of the Predix components your application is using, then pass this object to every component that needs localization.

Alternatively, your application could have one JSON file per language, load this file in one place, and then pass it down to every component. The components then only need to have their `language` property changed to match the one in `resources`.

The list of strings required per component can be found [here](#/guides/localize-strings/) for the time being, while we devise a better mechanism to help people build the list of strings they need to localize in their application.


## Localizing d3.js

Some of the Predix components use d3.js to handle date and number formatting, in particular the data visualization components. The Predix components load their own version of d3.js, so that an application can also load any version of d3.js without version conflicts.

The d3.js library supports two different types of localization: date/time format and number format. The Predix version of d3.js can therefore be localized through two different convenience functions: `Px.d3.changeNumberLocale()` and `Px.d3.changeTimeLocale()`.

### Load a supported locale

**Important note: in order to load the date/time and number locales, you need to make sure your build includes the `timeLocale` and `numberLocale` folders from px-d3-imports.** By default, the locales will be searched for in the `px-d3-imports` folder, but the paths can be overridden through the `Px.d3.timeLocaleURL` and `Px.d3.numberLocaleURL` properties.

**Important note: if you use custom d3 formatter (d3.timeFormat() or d3.format()) then those will need to be recreated after changing the related locale (timeLocale for timeFormat and numberLocale for format). You also need to make sure you use Px.d3.timeFormat and Px.d3.format, or you wil have to also manually localize d3.**

To load a locale, just pass one of the following supported locales and an optional callback to the appropriate convenience function (which will be called after the locale has been successfully loaded).

Example:
```javascript
Px.d3.changeTimeLocale('ca-ES', function() {
 console.log('d3 time locale changed!');
});

Px.d3.changeNumberLocale('ar-PS', function() {
 console.log('d3 number locale changed!');
});
```


<px-accordion icons='{"more":"px-utl:chevron-right","less":"px-utl:chevron"}' header-value="Supported d3 date/time locales">
<li>ca-ES</li>
<li>cs-CZ</li>
<li>de-CH</li>
<li>de-DE</li>
<li>en-CA</li>
<li>en-GB</li>
<li>en-US</li>
<li>es-ES</li>
<li>es-MX</li>
<li>fi-FI</li>
<li>fr-CA</li>
<li>fr-FR</li>
<li>he-IL</li>
<li>hu-HU</li>
<li>it-IT</li>
<li>ja-JP</li>
<li>ko-KR</li>
<li>mk-MK</li>
<li>nl-NL</li>
<li>pl-PL</li>
<li>pt-BR</li>
<li>ru-RU</li>
<li>sv-SE</li>
<li>uk-UA</li>
<li>zh-CN</li>
</px-accordion>


<px-accordion icons='{"more":"px-utl:chevron-right","less":"px-utl:chevron"}' header-value="Supported d3 number locales">
<li>ar-00</li>
<li>ar-AE</li>
<li>ar-BH</li>
<li>ar-DJ</li>
<li>ar-DZ</li>
<li>ar-EG</li>
<li>ar-EH</li>
<li>ar-ER</li>
<li>ar-IL</li>
<li>ar-IQ</li>
<li>ar-JO</li>
<li>ar-KM</li>
<li>ar-KW</li>
<li>ar-LB</li>
<li>ar-LY</li>
<li>ar-MA</li>
<li>ar-MR</li>
<li>ar-OM</li>
<li>ar-PS</li>
<li>ar-QA</li>
<li>ar-SA</li>
<li>ar-SD</li>
<li>ar-SO</li>
<li>ar-SS</li>
<li>ar-SY</li>
<li>ar-TD</li>
<li>ar-TN</li>
<li>ar-YE</li>
<li>ca-ES</li>
<li>cs-CZ</li>
<li>de-CH</li>
<li>de-DE</li>
<li>en-CA</li>
<li>en-GB</li>
<li>en-IN</li>
<li>en-US</li>
<li>es-ES</li>
<li>es-MX</li>
<li>fi-FI</li>
<li>fr-CA</li>
<li>fr-FR</li>
<li>he-IL</li>
<li>hu-HU</li>
<li>it-IT</li>
<li>ja-JP</li>
<li>ko-KR</li>
<li>mk-MK</li>
<li>nl-NL</li>
<li>pl-PL</li>
<li>pt-BR</li>
<li>ru-RU</li>
<li>sv-SE</li>
<li>uk-UA</li>
<li>zh-CN</li>
</px-accordion>


Because the locale needs to be fetched from a JSON file asynchronously, you can use the callback in `Px.d3.changeTimeLocale/Px.d3.changeNumberLocale` in order to perform actions after the locale has been loaded (such as updating the `language` and `resources` of the PX components).

### Load a custom locale


Loading a custom locale is relatively straightforward, but requires manually loading/generating a config object as defined by d3.js [here](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormatDefaultLocale) for date/time and [here](https://github.com/d3/d3-format/blob/master/README.md#formatDefaultLocale) for numbers.

Example:
```javascript
Px.d3.changeTimeLocale(null, null, yourConfigObject);
Px.d3.changeNumberLocale(null, null, yourConfigObject);
```


In this scenario, the d3.js locale change is synchronous.


## Localizing moment.js


Some of the Predix Design System components use moment.js to handle date and time, in particular the datetime and data visualization components. The Predix components load their own version of moment.js so that an application can also load any version of moment.js without version conflicts.

The Predix Design System version of moment.js can be localized through the convenience function `Px.moment.changeLocale()`. This function can either load a locale out of the box, or any custom locale can be used.

Please note that when changing the moment locale, previously created moment objects are not affected, and might need to be recreated/updated. Predix components depending on moment.js will recreate their own moment objects after their `language` property changes; so when localizing components, the moment locale will need to be changed *before* changing the `language` property of the component.

### Load a supported locale

**Important note: in order to be able to load these locales, you need to make sure your build includes the `momentLocale` folder from px-moment-imports**. By default the locale will be searched for in the `px-datetime-common/momentLocale` folder, but the path can be overridden through the `Px.moment.localeURL` property.

When loading a supported locale, just pass one of the following locales and an optional callback (which will be called after the locale has been successfully loaded).

Example:
```javascript
Px.moment.changeLocale('fr', function() {
 console.log('moment locale changed!');
});
```

<px-accordion icons='{"more":"px-utl:chevron-right","less":"px-utl:chevron"}' header-value="List of out-of-the-box moment locales">
<li>af</li>
<li>ar-dz</li>
<li>ar-kw</li>
<li>ar-ly</li>
<li>ar-ma</li>
<li>ar-sa</li>
<li>ar-tn</li>
<li>ar</li>
<li>az</li>
<li>be</li>
<li>bg</li>
<li>bn</li>
<li>bo</li>
<li>br</li>
<li>bs</li>
<li>ca</li>
<li>cs</li>
<li>cv</li>
<li>cy</li>
<li>da</li>
<li>de-at</li>
<li>de-ch</li>
<li>de</li>
<li>dv</li>
<li>el</li>
<li>en-au</li>
<li>en-ca</li>
<li>en-gb</li>
<li>en-ie</li>
<li>en-nz</li>
<li>eo</li>
<li>es-do</li>
<li>es</li>
<li>et</li>
<li>eu</li>
<li>fa</li>
<li>fi</li>
<li>fo</li>
<li>fr-ca</li>
<li>fr-ch</li>
<li>fr</li>
<li>fy</li>
<li>gd</li>
<li>gl</li>
<li>gom-latn</li>
<li>he</li>
<li>hi</li>
<li>hr</li>
<li>hu</li>
<li>hy-am</li>
<li>id</li>
<li>is</li>
<li>it</li>
<li>ja</li>
<li>jv</li>
<li>ka</li>
<li>kk</li>
<li>km</li>
<li>kn</li>
<li>ko</li>
<li>ky</li>
<li>lb</li>
<li>lo</li>
<li>lt</li>
<li>lv</li>
<li>me</li>
<li>mi</li>
<li>mk</li>
<li>ml</li>
<li>mr</li>
<li>ms-my</li>
<li>ms</li>
<li>my</li>
<li>nb</li>
<li>ne</li>
<li>nl-be</li>
<li>nl</li>
<li>nn</li>
<li>pa-in</li>
<li>pl</li>
<li>pt-br</li>
<li>pt</li>
<li>ro</li>
<li>ru</li>
<li>sd</li>
<li>se</li>
<li>si</li>
<li>sk</li>
<li>sl</li>
<li>sq</li>
<li>sr-cyrl</li>
<li>sr</li>
<li>ss</li>
<li>sv</li>
<li>sw</li>
<li>ta</li>
<li>te</li>
<li>tet</li>
<li>th</li>
<li>tl-ph</li>
<li>tlh</li>
<li>tr</li>
<li>tzl</li>
<li>tzm-latn</li>
<li>tzm</li>
<li>uk</li>
<li>ur</li>
<li>uz-latn</li>
<li>uz</li>
<li>vi</li>
<li>x-pseudo</li>
<li>yo</li>
<li>zh-cn</li>
<li>zh-hk</li>
<li>zh-tw</li>
</px-accordion>



Because the locale needs to be fetched from a script, this process is asynchronous; you can use the callback in `Px.moment.changeLocale` in order to perform actions after the locale has been loaded (such as updating the `language` and `resources` of the Predix components).

### Load a custom locale

Loading a custom locale is relatively straightforward, but requires manually loading/generating a config object as defined by moment.js [here](http://momentjs.com/docs/#/customization/).

Example:
```javascript
Px.moment.changeLocale(null, null, yourConfigObject);
```

In this scenario, the moment.js locale change is synchronous. In order for a component to pick up a moment locale change, its `language` property **needs** to be updated, even if it doesn't have new resources to load.
