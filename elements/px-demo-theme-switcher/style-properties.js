this.Px = this.Px || {};
this.Px.StyleProperties = (function () {
'use strict';

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Extremely simple css parser. Intended to be not more than what we need
and definitely not necessarily correct =).
*/

/** @unrestricted */
class StyleNode {
  constructor() {
    /** @type {number} */
    this['start'] = 0;
    /** @type {number} */
    this['end'] = 0;
    /** @type {StyleNode} */
    this['previous'] = null;
    /** @type {StyleNode} */
    this['parent'] = null;
    /** @type {Array<StyleNode>} */
    this['rules'] = null;
    /** @type {string} */
    this['parsedCssText'] = '';
    /** @type {string} */
    this['cssText'] = '';
    /** @type {boolean} */
    this['atRule'] = false;
    /** @type {number} */
    this['type'] = 0;
    /** @type {string} */
    this['keyframesName'] = '';
    /** @type {string} */
    this['selector'] = '';
    /** @type {string} */
    this['parsedSelector'] = '';
  }
}

// given a string of css, return a simple rule tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function parse(text) {
  text = clean(text);
  return parseCss(lex(text), text);
}

// remove stuff we don't care about that may hinder parsing
/**
 * @param {string} cssText
 * @return {string}
 */
function clean(cssText) {
  return cssText.replace(RX.comments, '').replace(RX.port, '');
}

// super simple {...} lexer that returns a node tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function lex(text) {
  let root = new StyleNode();
  root['start'] = 0;
  root['end'] = text.length;
  let n = root;
  for (let i = 0, l = text.length; i < l; i++) {
    if (text[i] === OPEN_BRACE) {
      if (!n['rules']) {
        n['rules'] = [];
      }
      let p = n;
      let previous = p['rules'][p['rules'].length - 1] || null;
      n = new StyleNode();
      n['start'] = i + 1;
      n['parent'] = p;
      n['previous'] = previous;
      p['rules'].push(n);
    } else if (text[i] === CLOSE_BRACE) {
      n['end'] = i + 1;
      n = n['parent'] || root;
    }
  }
  return root;
}

// add selectors/cssText to node tree
/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {StyleNode}
 */
function parseCss(node, text) {
  let t = text.substring(node['start'], node['end'] - 1);
  node['parsedCssText'] = node['cssText'] = t.trim();
  if (node['parent']) {
    let ss = node['previous'] ? node['previous']['end'] : node['parent']['start'];
    t = text.substring(ss, node['start'] - 1);
    t = _expandUnicodeEscapes(t);
    t = t.replace(RX.multipleSpaces, ' ');
    // TODO(sorvell): ad hoc; make selector include only after last ;
    // helps with mixin syntax
    t = t.substring(t.lastIndexOf(';') + 1);
    let s = node['parsedSelector'] = node['selector'] = t.trim();
    node['atRule'] = (s.indexOf(AT_START) === 0);
    // note, support a subset of rule types...
    if (node['atRule']) {
      if (s.indexOf(MEDIA_START) === 0) {
        node['type'] = types.MEDIA_RULE;
      } else if (s.match(RX.keyframesRule)) {
        node['type'] = types.KEYFRAMES_RULE;
        node['keyframesName'] =
          node['selector'].split(RX.multipleSpaces).pop();
      }
    } else {
      if (s.indexOf(VAR_START) === 0) {
        node['type'] = types.MIXIN_RULE;
      } else {
        node['type'] = types.STYLE_RULE;
      }
    }
  }
  let r$ = node['rules'];
  if (r$) {
    for (let i = 0, l = r$.length, r;
      (i < l) && (r = r$[i]); i++) {
      parseCss(r, text);
    }
  }
  return node;
}

/**
 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
 * expanded form that doesn't require trailing space `\000033`
 * @param {string} s
 * @return {string}
 */
function _expandUnicodeEscapes(s) {
  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
    let code = arguments[1],
      repeat = 6 - code.length;
    while (repeat--) {
      code = '0' + code;
    }
    return '\\' + code;
  });
}

/**
 * stringify parsed css.
 * @param {StyleNode} node
 * @param {boolean=} preserveProperties
 * @param {string=} text
 * @return {string}
 */
function stringify(node, preserveProperties, text = '') {
  // calc rule cssText
  let cssText = '';
  if (node['cssText'] || node['rules']) {
    let r$ = node['rules'];
    if (r$ && !_hasMixinRules(r$)) {
      for (let i = 0, l = r$.length, r;
        (i < l) && (r = r$[i]); i++) {
        cssText = stringify(r, preserveProperties, cssText);
      }
    } else {
      cssText = preserveProperties ? node['cssText'] :
        removeCustomProps(node['cssText']);
      cssText = cssText.trim();
      if (cssText) {
        cssText = '  ' + cssText + '\n';
      }
    }
  }
  // emit rule if there is cssText
  if (cssText) {
    if (node['selector']) {
      text += node['selector'] + ' ' + OPEN_BRACE + '\n';
    }
    text += cssText;
    if (node['selector']) {
      text += CLOSE_BRACE + '\n\n';
    }
  }
  return text;
}

/**
 * @param {Array<StyleNode>} rules
 * @return {boolean}
 */
function _hasMixinRules(rules) {
  let r = rules[0];
  return Boolean(r) && Boolean(r['selector']) && r['selector'].indexOf(VAR_START) === 0;
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomProps(cssText) {
  cssText = removeCustomPropAssignment(cssText);
  return removeCustomPropApply(cssText);
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomPropAssignment(cssText) {
  return cssText
    .replace(RX.customProp, '')
    .replace(RX.mixinProp, '');
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomPropApply(cssText) {
  return cssText
    .replace(RX.mixinApply, '')
    .replace(RX.varApply, '');
}

/** @enum {number} */
const types = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7,
  MEDIA_RULE: 4,
  MIXIN_RULE: 1000
};

const OPEN_BRACE = '{';
const CLOSE_BRACE = '}';

// helper regexp's
const RX = {
  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
  port: /@import[^;]*;/gim,
  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
  keyframesRule: /^@[^\s]*keyframes/,
  multipleSpaces: /\s+/g
};

const VAR_START = '--';
const MEDIA_START = '@media';
const AT_START = '@';

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

let nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
let nativeCssVariables;

/**
 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
 */
function calcCssVariables(settings) {
  if (settings && settings['shimcssproperties']) {
    nativeCssVariables = false;
  } else {
    // chrome 49 has semi-working css vars, check if box-shadow works
    // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
    // However, shim css custom properties are only supported with ShadyDOM enabled,
    // so fall back on native if we do not detect ShadyDOM
    // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
    nativeCssVariables = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
      window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
  }
}

if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
  nativeCssVariables = window.ShadyCSS.nativeCss;
} else if (window.ShadyCSS) {
  calcCssVariables(window.ShadyCSS);
  // reset window variable to let ShadyCSS API take its place
  window.ShadyCSS = undefined;
} else {
  calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
}

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
const MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
const VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
const ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
const MEDIA_MATCH = /@media\s(.*)/;

const BRACKETED = /\{[^}]*\}/g;
const HOST_PREFIX = '(?:^|[^.#[:])';
const HOST_SUFFIX = '($|[.:[\\s>+~])';

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * Add a specifically-marked style to the document directly, and only one copy of that style.
 *
 * @param {!HTMLStyleElement} style
 * @return {undefined}
 */


/**
 * Check if a style is supposed to be unscoped
 * @param {!HTMLStyleElement} style
 * @return {boolean} true if the style has the unscoping attribute
 */

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @param {string|StyleNode} rules
 * @param {function(StyleNode)=} callback
 * @return {string}
 */
function toCssText (rules, callback) {
  if (!rules) {
    return '';
  }
  if (typeof rules === 'string') {
    rules = parse(rules);
  }
  if (callback) {
    forEachRule(rules, callback);
  }
  return stringify(rules, nativeCssVariables);
}

/**
 * @param {HTMLStyleElement} style
 * @return {StyleNode}
 */
function rulesForStyle(style) {
  if (!style['__cssRules'] && style.textContent) {
    style['__cssRules'] = parse(style.textContent);
  }
  return style['__cssRules'] || null;
}

// Tests if a rule is a keyframes selector, which looks almost exactly
// like a normal selector but is not (it has nothing to do with scoping
// for example).
/**
 * @param {StyleNode} rule
 * @return {boolean}
 */
function isKeyframesSelector(rule) {
  return Boolean(rule['parent']) &&
  rule['parent']['type'] === types.KEYFRAMES_RULE;
}

/**
 * @param {StyleNode} node
 * @param {Function=} styleRuleCallback
 * @param {Function=} keyframesRuleCallback
 * @param {boolean=} onlyActiveRules
 */
function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
  if (!node) {
    return;
  }
  let skipRules = false;
  let type = node['type'];
  if (onlyActiveRules) {
    if (type === types.MEDIA_RULE) {
      let matchMedia = node['selector'].match(MEDIA_MATCH);
      if (matchMedia) {
        // if rule is a non matching @media rule, skip subrules
        if (!window.matchMedia(matchMedia[1]).matches) {
          skipRules = true;
        }
      }
    }
  }
  if (type === types.STYLE_RULE) {
    styleRuleCallback(node);
  } else if (keyframesRuleCallback &&
    type === types.KEYFRAMES_RULE) {
    keyframesRuleCallback(node);
  } else if (type === types.MIXIN_RULE) {
    skipRules = true;
  }
  let r$ = node['rules'];
  if (r$ && !skipRules) {
    for (let i=0, l=r$.length, r; (i<l) && (r=r$[i]); i++) {
      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
    }
  }
}

// add a string of cssText to the document.
/**
 * @param {string} cssText
 * @param {string} moniker
 * @param {Node} target
 * @param {Node} contextNode
 * @return {HTMLStyleElement}
 */
function applyCss(cssText, moniker, target, contextNode) {
  let style = createScopeStyle(cssText, moniker);
  applyStyle(style, target, contextNode);
  return style;
}

/**
 * @param {string} cssText
 * @param {string} moniker
 * @return {HTMLStyleElement}
 */
function createScopeStyle(cssText, moniker) {
  let style = /** @type {HTMLStyleElement} */(document.createElement('style'));
  if (moniker) {
    style.setAttribute('scope', moniker);
  }
  style.textContent = cssText;
  return style;
}

/**
 * Track the position of the last added style for placing placeholders
 * @type {Node}
 */
let lastHeadApplyNode = null;

// insert a comment node as a styling position placeholder.
/**
 * @param {string} moniker
 * @return {!Comment}
 */


/**
 * @param {HTMLStyleElement} style
 * @param {?Node} target
 * @param {?Node} contextNode
 */
function applyStyle(style, target, contextNode) {
  target = target || document.head;
  let after = (contextNode && contextNode.nextSibling) ||
    target.firstChild;
  target.insertBefore(style, after);
  if (!lastHeadApplyNode) {
    lastHeadApplyNode = style;
  } else {
    // only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
    let position = style.compareDocumentPosition(lastHeadApplyNode);
    if (position === Node.DOCUMENT_POSITION_PRECEDING) {
      lastHeadApplyNode = style;
    }
  }
}

/**
 * @param {string} buildType
 * @return {boolean}
 */


/**
 * @param {Element} element
 * @return {?string}
 */


/**
 * Walk from text[start] matching parens and
 * returns position of the outer end paren
 * @param {string} text
 * @param {number} start
 * @return {number}
 */
function findMatchingParen(text, start) {
  let level = 0;
  for (let i=start, l=text.length; i < l; i++) {
    if (text[i] === '(') {
      level++;
    } else if (text[i] === ')') {
      if (--level === 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * @param {string} str
 * @param {function(string, string, string, string)} callback
 */
function processVariableAndFallback(str, callback) {
  // find 'var('
  let start = str.indexOf('var(');
  if (start === -1) {
    // no var?, everything is prefix
    return callback(str, '', '', '');
  }
  //${prefix}var(${inner})${suffix}
  let end = findMatchingParen(str, start + 3);
  let inner = str.substring(start + 4, end);
  let prefix = str.substring(0, start);
  // suffix may have other variables
  let suffix = processVariableAndFallback(str.substring(end + 1), callback);
  let comma = inner.indexOf(',');
  // value and fallback args should be trimmed to match in property lookup
  if (comma === -1) {
    // variable, no fallback
    return callback(prefix, inner.trim(), '', suffix);
  }
  // var(${value},${fallback})
  let value = inner.substring(0, comma).trim();
  let fallback = inner.substring(comma + 1).trim();
  return callback(prefix, value, fallback, suffix);
}

/**
 * @param {Element} element
 * @param {string} value
 */
function setElementClassRaw(element, value) {
  // use native setAttribute provided by ShadyDOM when setAttribute is patched
  if (nativeShadow) {
    element.setAttribute('class', value);
  } else {
    window['ShadyDOM']['nativeMethods']['setAttribute'].call(element, 'class', value);
  }
}

/**
 * @param {Element | {is: string, extends: string}} element
 * @return {{is: string, typeExtension: string}}
 */
function getIsExtends(element) {
  let localName = element['localName'];
  let is = '', typeExtension = '';
  /*
  NOTE: technically, this can be wrong for certain svg elements
  with `-` in the name like `<font-face>`
  */
  if (localName) {
    if (localName.indexOf('-') > -1) {
      is = localName;
    } else {
      typeExtension = localName;
      is = (element.getAttribute && element.getAttribute('is')) || '';
    }
  } else {
    is = /** @type {?} */(element).is;
    typeExtension = /** @type {?} */(element).extends;
  }
  return {is, typeExtension};
}

/**
 * @param {Element|DocumentFragment} element
 * @return {string}
 */

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* Transforms ShadowDOM styling into ShadyDOM styling

* scoping:

  * elements in scope get scoping selector class="x-foo-scope"
  * selectors re-written as follows:

    div button -> div.x-foo-scope button.x-foo-scope

* :host -> scopeName

* :host(...) -> scopeName...

* ::slotted(...) -> scopeName > ...

* ...:dir(ltr|rtl) -> [dir="ltr|rtl"] ..., ...[dir="ltr|rtl"]

* :host(:dir[rtl]) -> scopeName:dir(rtl) -> [dir="rtl"] scopeName, scopeName[dir="rtl"]

*/
const SCOPE_NAME = 'style-scope';

class StyleTransformer {
  get SCOPE_NAME() {
    return SCOPE_NAME;
  }
  // Given a node and scope name, add a scoping class to each node
  // in the tree. This facilitates transforming css into scoped rules.
  dom(node, scope, shouldRemoveScope) {
    // one time optimization to skip scoping...
    if (node['__styleScoped']) {
      node['__styleScoped'] = null;
    } else {
      this._transformDom(node, scope || '', shouldRemoveScope);
    }
  }

  _transformDom(node, selector, shouldRemoveScope) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      this.element(node, selector, shouldRemoveScope);
    }
    let c$ = (node.localName === 'template') ?
      (node.content || node._content).childNodes :
      node.children || node.childNodes;
    if (c$) {
      for (let i=0; i<c$.length; i++) {
        this._transformDom(c$[i], selector, shouldRemoveScope);
      }
    }
  }

  element(element, scope, shouldRemoveScope) {
    // note: if using classes, we add both the general 'style-scope' class
    // as well as the specific scope. This enables easy filtering of all
    // `style-scope` elements
    if (scope) {
      // note: svg on IE does not have classList so fallback to class
      if (element.classList) {
        if (shouldRemoveScope) {
          element.classList.remove(SCOPE_NAME);
          element.classList.remove(scope);
        } else {
          element.classList.add(SCOPE_NAME);
          element.classList.add(scope);
        }
      } else if (element.getAttribute) {
        let c = element.getAttribute(CLASS);
        if (shouldRemoveScope) {
          if (c) {
            let newValue = c.replace(SCOPE_NAME, '').replace(scope, '');
            setElementClassRaw(element, newValue);
          }
        } else {
          let newValue = (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope;
          setElementClassRaw(element, newValue);
        }
      }
    }
  }

  elementStyles(element, styleRules, callback) {
    let cssBuildType = element['__cssBuild'];
    // no need to shim selectors if settings.useNativeShadow, also
    // a shady css build will already have transformed selectors
    // NOTE: This method may be called as part of static or property shimming.
    // When there is a targeted build it will not be called for static shimming,
    // but when the property shim is used it is called and should opt out of
    // static shimming work when a proper build exists.
    let cssText = '';
    if (nativeShadow || cssBuildType === 'shady') {
      cssText = toCssText(styleRules, callback);
    } else {
      let {is, typeExtension} = getIsExtends(element);
      cssText = this.css(styleRules, is, typeExtension, callback) + '\n\n';
    }
    return cssText.trim();
  }

  // Given a string of cssText and a scoping string (scope), returns
  // a string of scoped css where each selector is transformed to include
  // a class created from the scope. ShadowDOM selectors are also transformed
  // (e.g. :host) to use the scoping selector.
  css(rules, scope, ext, callback) {
    let hostScope = this._calcHostScope(scope, ext);
    scope = this._calcElementScope(scope);
    let self = this;
    return toCssText(rules, function(/** StyleNode */rule) {
      if (!rule.isScoped) {
        self.rule(rule, scope, hostScope);
        rule.isScoped = true;
      }
      if (callback) {
        callback(rule, scope, hostScope);
      }
    });
  }

  _calcElementScope(scope) {
    if (scope) {
      return CSS_CLASS_PREFIX + scope;
    } else {
      return '';
    }
  }

  _calcHostScope(scope, ext) {
    return ext ? `[is=${scope}]` : scope;
  }

  rule(rule, scope, hostScope) {
    this._transformRule(rule, this._transformComplexSelector,
      scope, hostScope);
  }

  /**
   * transforms a css rule to a scoped rule.
   *
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */
  _transformRule(rule, transformer, scope, hostScope) {
    // NOTE: save transformedSelector for subsequent matching of elements
    // against selectors (e.g. when calculating style properties)
    rule['selector'] = rule.transformedSelector =
      this._transformRuleCss(rule, transformer, scope, hostScope);
  }

  /**
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */
  _transformRuleCss(rule, transformer, scope, hostScope) {
    let p$ = rule['selector'].split(COMPLEX_SELECTOR_SEP);
    // we want to skip transformation of rules that appear in keyframes,
    // because they are keyframe selectors, not element selectors.
    if (!isKeyframesSelector(rule)) {
      for (let i=0, l=p$.length, p; (i<l) && (p=p$[i]); i++) {
        p$[i] = transformer.call(this, p, scope, hostScope);
      }
    }
    return p$.join(COMPLEX_SELECTOR_SEP);
  }

  /**
   * @param {string} selector
   * @return {string}
   */
  _twiddleNthPlus(selector) {
    return selector.replace(NTH, (m, type, inside) => {
      if (inside.indexOf('+') > -1) {
        inside = inside.replace(/\+/g, '___');
      } else if (inside.indexOf('___') > -1) {
        inside = inside.replace(/___/g, '+');
      }
      return `:${type}(${inside})`;
    });
  }

/**
 * @param {string} selector
 * @param {string} scope
 * @param {string=} hostScope
 */
  _transformComplexSelector(selector, scope, hostScope) {
    let stop = false;
    selector = selector.trim();
    // Remove spaces inside of selectors like `:nth-of-type` because it confuses SIMPLE_SELECTOR_SEP
    let isNth = NTH.test(selector);
    if (isNth) {
      selector = selector.replace(NTH, (m, type, inner) => `:${type}(${inner.replace(/\s/g, '')})`);
      selector = this._twiddleNthPlus(selector);
    }
    selector = selector.replace(SLOTTED_START, `${HOST} $1`);
    selector = selector.replace(SIMPLE_SELECTOR_SEP, (m, c, s) => {
      if (!stop) {
        let info = this._transformCompoundSelector(s, c, scope, hostScope);
        stop = stop || info.stop;
        c = info.combinator;
        s = info.value;
      }
      return c + s;
    });
    if (isNth) {
      selector = this._twiddleNthPlus(selector);
    }
    return selector;
  }

  _transformCompoundSelector(selector, combinator, scope, hostScope) {
    // replace :host with host scoping class
    let slottedIndex = selector.indexOf(SLOTTED);
    if (selector.indexOf(HOST) >= 0) {
      selector = this._transformHostSelector(selector, hostScope);
    // replace other selectors with scoping class
    } else if (slottedIndex !== 0) {
      selector = scope ? this._transformSimpleSelector(selector, scope) :
        selector;
    }
    // mark ::slotted() scope jump to replace with descendant selector + arg
    // also ignore left-side combinator
    let slotted = false;
    if (slottedIndex >= 0) {
      combinator = '';
      slotted = true;
    }
    // process scope jumping selectors up to the scope jump and then stop
    let stop;
    if (slotted) {
      stop = true;
      if (slotted) {
        // .zonk ::slotted(.foo) -> .zonk.scope > .foo
        selector = selector.replace(SLOTTED_PAREN, (m, paren) => ` > ${paren}`);
      }
    }
    selector = selector.replace(DIR_PAREN, (m, before, dir) =>
      `[dir="${dir}"] ${before}, ${before}[dir="${dir}"]`);
    return {value: selector, combinator, stop};
  }

  _transformSimpleSelector(selector, scope) {
    let p$ = selector.split(PSEUDO_PREFIX);
    p$[0] += scope;
    return p$.join(PSEUDO_PREFIX);
  }

  // :host(...) -> scopeName...
  _transformHostSelector(selector, hostScope) {
    let m = selector.match(HOST_PAREN);
    let paren = m && m[2].trim() || '';
    if (paren) {
      if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
        // paren starts with a type selector
        let typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0];
        // if the type selector is our hostScope then avoid pre-pending it
        if (typeSelector === hostScope) {
          return paren;
        // otherwise, this selector should not match in this scope so
        // output a bogus selector.
        } else {
          return SELECTOR_NO_MATCH;
        }
      } else {
        // make sure to do a replace here to catch selectors like:
        // `:host(.foo)::before`
        return selector.replace(HOST_PAREN, function(m, host, paren) {
          return hostScope + paren;
        });
      }
    // if no paren, do a straight :host replacement.
    // TODO(sorvell): this should not strictly be necessary but
    // it's needed to maintain support for `:host[foo]` type selectors
    // which have been improperly used under Shady DOM. This should be
    // deprecated.
    } else {
      return selector.replace(HOST, hostScope);
    }
  }

  /**
   * @param {StyleNode} rule
   */
  documentRule(rule) {
    // reset selector in case this is redone.
    rule['selector'] = rule['parsedSelector'];
    this.normalizeRootSelector(rule);
    this._transformRule(rule, this._transformDocumentSelector);
  }

  /**
   * @param {StyleNode} rule
   */
  normalizeRootSelector(rule) {
    if (rule['selector'] === ROOT) {
      rule['selector'] = 'html';
    }
  }

/**
 * @param {string} selector
 */
  _transformDocumentSelector(selector) {
    return selector.match(SLOTTED) ?
      this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR) :
      this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
  }
}

let NTH = /:(nth[-\w]+)\(([^)]+)\)/;
let SCOPE_DOC_SELECTOR = `:not(.${SCOPE_NAME})`;
let COMPLEX_SELECTOR_SEP = ',';
let SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g;
let SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
let HOST = ':host';
let ROOT = ':root';
let SLOTTED = '::slotted';
let SLOTTED_START = new RegExp(`^(${SLOTTED})`);
// NOTE: this supports 1 nested () pair for things like
// :host(:not([selected]), more general support requires
// parsing which seems like overkill
let HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
// similar to HOST_PAREN
let SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
let DIR_PAREN = /(.*):dir\((?:(ltr|rtl))\)/;
let CSS_CLASS_PREFIX = '.';
let PSEUDO_PREFIX = ':';
let CLASS = 'class';
let SELECTOR_NO_MATCH = 'should_not_match';

var StyleTransformer$1 = new StyleTransformer();

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @const {string} */
const infoKey = '__styleInfo';

class StyleInfo {
  /**
   * @param {Element} node
   * @return {StyleInfo}
   */
  static get(node) {
    if (node) {
      return node[infoKey];
    } else {
      return null;
    }
  }
  /**
   * @param {!Element} node
   * @param {StyleInfo} styleInfo
   * @return {StyleInfo}
   */
  static set(node, styleInfo) {
    node[infoKey] = styleInfo;
    return styleInfo;
  }
  /**
   * @param {StyleNode} ast
   * @param {Node=} placeholder
   * @param {Array<string>=} ownStylePropertyNames
   * @param {string=} elementName
   * @param {string=} typeExtension
   * @param {string=} cssBuild
   */
  constructor(ast, placeholder, ownStylePropertyNames, elementName, typeExtension, cssBuild) {
    /** @type {StyleNode} */
    this.styleRules = ast || null;
    /** @type {Node} */
    this.placeholder = placeholder || null;
    /** @type {!Array<string>} */
    this.ownStylePropertyNames = ownStylePropertyNames || [];
    /** @type {Array<Object>} */
    this.overrideStyleProperties = null;
    /** @type {string} */
    this.elementName = elementName || '';
    /** @type {string} */
    this.cssBuild = cssBuild || '';
    /** @type {string} */
    this.typeExtension = typeExtension || '';
    /** @type {Object<string, string>} */
    this.styleProperties = null;
    /** @type {?string} */
    this.scopeSelector = null;
    /** @type {HTMLStyleElement} */
    this.customStyle = null;
  }
  _getStyleRules() {
    return this.styleRules;
  }
}

StyleInfo.prototype['_getStyleRules'] = StyleInfo.prototype._getStyleRules;

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// TODO: dedupe with shady
/**
 * @const {function(string):boolean}
 */
const matchesSelector = ((p) => p.matches || p.matchesSelector ||
  p.mozMatchesSelector || p.msMatchesSelector ||
p.oMatchesSelector || p.webkitMatchesSelector)(window.Element.prototype);

const IS_IE = navigator.userAgent.match('Trident');

const XSCOPE_NAME = 'x-scope';

class StyleProperties {
  get XSCOPE_NAME() {
    return XSCOPE_NAME;
  }
/**
 * decorates styles with rule info and returns an array of used style property names
 *
 * @param {StyleNode} rules
 * @return {Array<string>}
 */
  decorateStyles(rules) {
    let self = this, props = {}, keyframes = [], ruleIndex = 0;
    forEachRule(rules, function(rule) {
      self.decorateRule(rule);
      // mark in-order position of ast rule in styles block, used for cache key
      rule.index = ruleIndex++;
      self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
    }, function onKeyframesRule(rule) {
      keyframes.push(rule);
    });
    // Cache all found keyframes rules for later reference:
    rules._keyframes = keyframes;
    // return this list of property names *consumes* in these styles.
    let names = [];
    for (let i in props) {
      names.push(i);
    }
    return names;
  }

  // decorate a single rule with property info
  decorateRule(rule) {
    if (rule.propertyInfo) {
      return rule.propertyInfo;
    }
    let info = {}, properties = {};
    let hasProperties = this.collectProperties(rule, properties);
    if (hasProperties) {
      info.properties = properties;
      // TODO(sorvell): workaround parser seeing mixins as additional rules
      rule['rules'] = null;
    }
    info.cssText = this.collectCssText(rule);
    rule.propertyInfo = info;
    return info;
  }

  // collects the custom properties from a rule's cssText
  collectProperties(rule, properties) {
    let info = rule.propertyInfo;
    if (info) {
      if (info.properties) {
        Object.assign(properties, info.properties);
        return true;
      }
    } else {
      let m, rx = VAR_ASSIGN;
      let cssText = rule['parsedCssText'];
      let value;
      let any;
      while ((m = rx.exec(cssText))) {
        // note: group 2 is var, 3 is mixin
        value = (m[2] || m[3]).trim();
        // value of 'inherit' or 'unset' is equivalent to not setting the property here
        if (value !== 'inherit' || value !== 'unset') {
          properties[m[1].trim()] = value;
        }
        any = true;
      }
      return any;
    }

  }

  // returns cssText of properties that consume variables/mixins
  collectCssText(rule) {
    return this.collectConsumingCssText(rule['parsedCssText']);
  }

  // NOTE: we support consumption inside mixin assignment
  // but not production, so strip out {...}
  collectConsumingCssText(cssText) {
    return cssText.replace(BRACKETED, '')
      .replace(VAR_ASSIGN, '');
  }

  collectPropertiesInCssText(cssText, props) {
    let m;
    while ((m = VAR_CONSUMED.exec(cssText))) {
      let name = m[1];
      // This regex catches all variable names, and following non-whitespace char
      // If next char is not ':', then variable is a consumer
      if (m[2] !== ':') {
        props[name] = true;
      }
    }
  }

  // turns custom properties into realized values.
  reify(props) {
    // big perf optimization here: reify only *own* properties
    // since this object has __proto__ of the element's scope properties
    let names = Object.getOwnPropertyNames(props);
    for (let i=0, n; i < names.length; i++) {
      n = names[i];
      props[n] = this.valueForProperty(props[n], props);
    }
  }

  // given a property value, returns the reified value
  // a property value may be:
  // (1) a literal value like: red or 5px;
  // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
  // var(--a, var(--b));
  // (3) a literal mixin value like { properties }. Each of these properties
  // can have values that are: (a) literal, (b) variables, (c) @apply mixins.
  valueForProperty(property, props) {
    // case (1) default
    // case (3) defines a mixin and we have to reify the internals
    if (property) {
      if (property.indexOf(';') >=0) {
        property = this.valueForProperties(property, props);
      } else {
        // case (2) variable
        let self = this;
        let fn = function(prefix, value, fallback, suffix) {
          if (!value) {
            return prefix + suffix;
          }
          let propertyValue = self.valueForProperty(props[value], props);
          // if value is "initial", then the variable should be treated as unset
          if (!propertyValue || propertyValue === 'initial') {
            // fallback may be --a or var(--a) or literal
            propertyValue = self.valueForProperty(props[fallback] || fallback, props) ||
            fallback;
          } else if (propertyValue === 'apply-shim-inherit') {
            // CSS build will replace `inherit` with `apply-shim-inherit`
            // for use with native css variables.
            // Since we have full control, we can use `inherit` directly.
            propertyValue = 'inherit';
          }
          return prefix + (propertyValue || '') + suffix;
        };
        property = processVariableAndFallback(property, fn);
      }
    }
    return property && property.trim() || '';
  }

  // note: we do not yet support mixin within mixin
  valueForProperties(property, props) {
    let parts = property.split(';');
    for (let i=0, p, m; i<parts.length; i++) {
      if ((p = parts[i])) {
        MIXIN_MATCH.lastIndex = 0;
        m = MIXIN_MATCH.exec(p);
        if (m) {
          p = this.valueForProperty(props[m[1]], props);
        } else {
          let colon = p.indexOf(':');
          if (colon !== -1) {
            let pp = p.substring(colon);
            pp = pp.trim();
            pp = this.valueForProperty(pp, props) || pp;
            p = p.substring(0, colon) + pp;
          }
        }
        parts[i] = (p && p.lastIndexOf(';') === p.length - 1) ?
          // strip trailing ;
          p.slice(0, -1) :
          p || '';
      }
    }
    return parts.join(';');
  }

  applyProperties(rule, props) {
    let output = '';
    // dynamically added sheets may not be decorated so ensure they are.
    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }
    if (rule.propertyInfo.cssText) {
      output = this.valueForProperties(rule.propertyInfo.cssText, props);
    }
    rule['cssText'] = output;
  }

  // Apply keyframe transformations to the cssText of a given rule. The
  // keyframeTransforms object is a map of keyframe names to transformer
  // functions which take in cssText and spit out transformed cssText.
  applyKeyframeTransforms(rule, keyframeTransforms) {
    let input = rule['cssText'];
    let output = rule['cssText'];
    if (rule.hasAnimations == null) {
      // Cache whether or not the rule has any animations to begin with:
      rule.hasAnimations = ANIMATION_MATCH.test(input);
    }
    // If there are no animations referenced, we can skip transforms:
    if (rule.hasAnimations) {
      let transform;
      // If we haven't transformed this rule before, we iterate over all
      // transforms:
      if (rule.keyframeNamesToTransform == null) {
        rule.keyframeNamesToTransform = [];
        for (let keyframe in keyframeTransforms) {
          transform = keyframeTransforms[keyframe];
          output = transform(input);
          // If the transform actually changed the CSS text, we cache the
          // transform name for future use:
          if (input !== output) {
            input = output;
            rule.keyframeNamesToTransform.push(keyframe);
          }
        }
      } else {
        // If we already have a list of keyframe names that apply to this
        // rule, we apply only those keyframe name transforms:
        for (let i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
          transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
          input = transform(input);
        }
        output = input;
      }
    }
    rule['cssText'] = output;
  }

  // Test if the rules in these styles matches the given `element` and if so,
  // collect any custom properties into `props`.
  /**
   * @param {StyleNode} rules
   * @param {Element} element
   */
  propertyDataFromStyles(rules, element) {
    let props = {}, self = this;
    // generates a unique key for these matches
    let o = [];
    // note: active rules excludes non-matching @media rules
    forEachRule(rules, function(rule) {
      // TODO(sorvell): we could trim the set of rules at declaration
      // time to only include ones that have properties
      if (!rule.propertyInfo) {
        self.decorateRule(rule);
      }
      // match element against transformedSelector: selector may contain
      // unwanted uniquification and parsedSelector does not directly match
      // for :host selectors.
      let selectorToMatch = rule.transformedSelector || rule['parsedSelector'];
      if (element && rule.propertyInfo.properties && selectorToMatch) {
        if (matchesSelector.call(element, selectorToMatch)) {
          self.collectProperties(rule, props);
          // produce numeric key for these matches for lookup
          addToBitMask(rule.index, o);
        }
      }
    }, null, true);
    return {properties: props, key: o};
  }

  /**
   * @param {Element} scope
   * @param {StyleNode} rule
   * @param {string|undefined} cssBuild
   * @param {function(Object)} callback
   */
  whenHostOrRootRule(scope, rule, cssBuild, callback) {
    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }
    if (!rule.propertyInfo.properties) {
      return;
    }
    let {is, typeExtension} = getIsExtends(scope);
    let hostScope = is ?
      StyleTransformer$1._calcHostScope(is, typeExtension) :
      'html';
    let parsedSelector = rule['parsedSelector'];
    let isRoot = (parsedSelector === ':host > *' || parsedSelector === 'html');
    let isHost = parsedSelector.indexOf(':host') === 0 && !isRoot;
    // build info is either in scope (when scope is an element) or in the style
    // when scope is the default scope; note: this allows default scope to have
    // mixed mode built and unbuilt styles.
    if (cssBuild === 'shady') {
      // :root -> x-foo > *.x-foo for elements and html for custom-style
      isRoot = parsedSelector === (hostScope + ' > *.' + hostScope) || parsedSelector.indexOf('html') !== -1;
      // :host -> x-foo for elements, but sub-rules have .x-foo in them
      isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
    }
    if (cssBuild === 'shadow') {
      isRoot = parsedSelector === ':host > *' || parsedSelector === 'html';
      isHost = isHost && !isRoot;
    }
    if (!isRoot && !isHost) {
      return;
    }
    let selectorToMatch = hostScope;
    if (isHost) {
      // need to transform :host under ShadowDOM because `:host` does not work with `matches`
      if (nativeShadow && !rule.transformedSelector) {
        // transform :host into a matchable selector
        rule.transformedSelector =
        StyleTransformer$1._transformRuleCss(
          rule,
          StyleTransformer$1._transformComplexSelector,
          StyleTransformer$1._calcElementScope(is),
          hostScope
        );
      }
      selectorToMatch = rule.transformedSelector || hostScope;
    }
    callback({
      selector: selectorToMatch,
      isHost: isHost,
      isRoot: isRoot
    });
  }
/**
 * @param {Element} scope
 * @param {StyleNode} rules
 * @return {Object}
 */
  hostAndRootPropertiesForScope(scope, rules) {
    let hostProps = {}, rootProps = {}, self = this;
    // note: active rules excludes non-matching @media rules
    let cssBuild = rules && rules['__cssBuild'];
    forEachRule(rules, function(rule) {
      // if scope is StyleDefaults, use _element for matchesSelector
      self.whenHostOrRootRule(scope, rule, cssBuild, function(info) {
        let element = scope._element || scope;
        if (matchesSelector.call(element, info.selector)) {
          if (info.isHost) {
            self.collectProperties(rule, hostProps);
          } else {
            self.collectProperties(rule, rootProps);
          }
        }
      });
    }, null, true);
    return {rootProps: rootProps, hostProps: hostProps};
  }

  /**
   * @param {Element} element
   * @param {Object} properties
   * @param {string} scopeSelector
   */
  transformStyles(element, properties, scopeSelector) {
    let self = this;
    let {is, typeExtension} = getIsExtends(element);
    let hostSelector = StyleTransformer$1
      ._calcHostScope(is, typeExtension);
    let rxHostSelector = element.extends ?
      '\\' + hostSelector.slice(0, -1) + '\\]' :
      hostSelector;
    let hostRx = new RegExp(HOST_PREFIX + rxHostSelector +
      HOST_SUFFIX);
    let rules = StyleInfo.get(element).styleRules;
    let keyframeTransforms =
      this._elementKeyframeTransforms(element, rules, scopeSelector);
    return StyleTransformer$1.elementStyles(element, rules, function(rule) {
      self.applyProperties(rule, properties);
      if (!nativeShadow &&
          !isKeyframesSelector(rule) &&
          rule['cssText']) {
        // NOTE: keyframe transforms only scope munge animation names, so it
        // is not necessary to apply them in ShadowDOM.
        self.applyKeyframeTransforms(rule, keyframeTransforms);
        self._scopeSelector(rule, hostRx, hostSelector, scopeSelector);
      }
    });
  }

  /**
   * @param {Element} element
   * @param {StyleNode} rules
   * @param {string} scopeSelector
   * @return {Object}
   */
  _elementKeyframeTransforms(element, rules, scopeSelector) {
    let keyframesRules = rules._keyframes;
    let keyframeTransforms = {};
    if (!nativeShadow && keyframesRules) {
      // For non-ShadowDOM, we transform all known keyframes rules in
      // advance for the current scope. This allows us to catch keyframes
      // rules that appear anywhere in the stylesheet:
      for (let i = 0, keyframesRule = keyframesRules[i];
           i < keyframesRules.length;
           keyframesRule = keyframesRules[++i]) {
        this._scopeKeyframes(keyframesRule, scopeSelector);
        keyframeTransforms[keyframesRule['keyframesName']] =
            this._keyframesRuleTransformer(keyframesRule);
      }
    }
    return keyframeTransforms;
  }

  // Generate a factory for transforming a chunk of CSS text to handle a
  // particular scoped keyframes rule.
  /**
   * @param {StyleNode} keyframesRule
   * @return {function(string):string}
   */
  _keyframesRuleTransformer(keyframesRule) {
    return function(cssText) {
      return cssText.replace(
          keyframesRule.keyframesNameRx,
          keyframesRule.transformedKeyframesName);
    };
  }

/**
 * Transforms `@keyframes` names to be unique for the current host.
 * Example: @keyframes foo-anim -> @keyframes foo-anim-x-foo-0
 *
 * @param {StyleNode} rule
 * @param {string} scopeId
 */
  _scopeKeyframes(rule, scopeId) {
    // Animation names are of the form [\w-], so ensure that the name regex does not partially apply
    // to similarly named keyframe names by checking for a word boundary at the beginning and
    // a non-word boundary or `-` at the end.
    rule.keyframesNameRx = new RegExp(`\\b${rule['keyframesName']}(?!\\B|-)`, 'g');
    rule.transformedKeyframesName = rule['keyframesName'] + '-' + scopeId;
    rule.transformedSelector = rule.transformedSelector || rule['selector'];
    rule['selector'] = rule.transformedSelector.replace(
        rule['keyframesName'], rule.transformedKeyframesName);
  }

  // Strategy: x scope shim a selector e.g. to scope `.x-foo-42` (via classes):
  // non-host selector: .a.x-foo -> .x-foo-42 .a.x-foo
  // host selector: x-foo.wide -> .x-foo-42.wide
  // note: we use only the scope class (.x-foo-42) and not the hostSelector
  // (x-foo) to scope :host rules; this helps make property host rules
  // have low specificity. They are overrideable by class selectors but,
  // unfortunately, not by type selectors (e.g. overriding via
  // `.special` is ok, but not by `x-foo`).
  /**
   * @param {StyleNode} rule
   * @param {RegExp} hostRx
   * @param {string} hostSelector
   * @param {string} scopeId
   */
  _scopeSelector(rule, hostRx, hostSelector, scopeId) {
    rule.transformedSelector = rule.transformedSelector || rule['selector'];
    let selector = rule.transformedSelector;
    let scope = '.' + scopeId;
    let parts = selector.split(',');
    for (let i=0, l=parts.length, p; (i<l) && (p=parts[i]); i++) {
      parts[i] = p.match(hostRx) ?
        p.replace(hostSelector, scope) :
        scope + ' ' + p;
    }
    rule['selector'] = parts.join(',');
  }

  /**
   * @param {Element} element
   * @param {string} selector
   * @param {string} old
   */
  applyElementScopeSelector(element, selector, old) {
    let c = element.getAttribute('class') || '';
    let v = c;
    if (old) {
      v = c.replace(
        new RegExp('\\s*' + XSCOPE_NAME + '\\s*' + old + '\\s*', 'g'), ' ');
    }
    v += (v ? ' ' : '') + XSCOPE_NAME + ' ' + selector;
    if (c !== v) {
      setElementClassRaw(element, v);
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {Object} properties
   * @param {string} selector
   * @param {HTMLStyleElement} style
   * @return {HTMLStyleElement}
   */
  applyElementStyle(element, properties, selector, style) {
    // calculate cssText to apply
    let cssText = style ? style.textContent || '' :
      this.transformStyles(element, properties, selector);
    // if shady and we have a cached style that is not style, decrement
    let styleInfo = StyleInfo.get(element);
    let s = styleInfo.customStyle;
    if (s && !nativeShadow && (s !== style)) {
      s['_useCount']--;
      if (s['_useCount'] <= 0 && s.parentNode) {
        s.parentNode.removeChild(s);
      }
    }
    // apply styling always under native or if we generated style
    // or the cached style is not in document(!)
    if (nativeShadow) {
      // update existing style only under native
      if (styleInfo.customStyle) {
        styleInfo.customStyle.textContent = cssText;
        style = styleInfo.customStyle;
      // otherwise, if we have css to apply, do so
      } else if (cssText) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        style = applyCss(cssText, selector, element.shadowRoot,
          styleInfo.placeholder);
      }
    } else {
      // shady and no cache hit
      if (!style) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        if (cssText) {
          style = applyCss(cssText, selector, null,
            styleInfo.placeholder);
        }
      // shady and cache hit but not in document
      } else if (!style.parentNode) {
        if (IS_IE && cssText.indexOf('@media') > -1) {
            // @media rules may be stale in IE 10 and 11
            // refresh the text content of the style to revalidate them.
          style.textContent = cssText;
        }
        applyStyle(style, null, styleInfo.placeholder);
      }
    }
    // ensure this style is our custom style and increment its use count.
    if (style) {
      style['_useCount'] = style['_useCount'] || 0;
      // increment use count if we changed styles
      if (styleInfo.customStyle != style) {
        style['_useCount']++;
      }
      styleInfo.customStyle = style;
    }
    return style;
  }

  /**
   * @param {Element} style
   * @param {Object} properties
   */
  applyCustomStyle(style, properties) {
    let rules = rulesForStyle(/** @type {HTMLStyleElement} */(style));
    let self = this;
    style.textContent = toCssText(rules, function(/** StyleNode */rule) {
      let css = rule['cssText'] = rule['parsedCssText'];
      if (rule.propertyInfo && rule.propertyInfo.cssText) {
        // remove property assignments
        // so next function isn't confused
        // NOTE: we have 3 categories of css:
        // (1) normal properties,
        // (2) custom property assignments (--foo: red;),
        // (3) custom property usage: border: var(--foo); @apply(--foo);
        // In elements, 1 and 3 are separated for efficiency; here they
        // are not and this makes this case unique.
        css = removeCustomPropAssignment(/** @type {string} */(css));
        // replace with reified properties, scenario is same as mixin
        rule['cssText'] = self.valueForProperties(css, properties);
      }
    });
  }
}

/**
 * @param {number} n
 * @param {Array<number>} bits
 */
function addToBitMask(n, bits) {
  let o = parseInt(n / 32, 10);
  let v = 1 << (n % 32);
  bits[o] = (bits[o] || 0) | v;
}

var styleProperties = new StyleProperties();

return styleProperties;

}());
//# sourceMappingURL=style-properties.js.map
