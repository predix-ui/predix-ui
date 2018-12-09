// const MarkdownIt = require('markdown-it');
const mdContainer = require('markdown-it-container');
const mdAnchor = require('markdown-it-anchor');
const mdFrontmatter = require('markdown-it-front-matter');
const yaml = require('js-yaml');

const md = require('markdown-it')({
  html: true
});

/*
 * PLUGIN : ANCHORS
 * Adds anchor tags to the top two levels of headers in a file. Collects those
 * anchor tags into a nested array for printing later.
 */

var anchors;
md.use(mdAnchor, {
  level: [1,2],
  callback: (token, info) => {
    if (token.markup === '#') {
      anchors.push(Object.assign({}, info, { children: [] }));
    }
    if (token.markup === '##') {
      if (anchors.length > 0 && anchors[anchors.length-1].children) {
        anchors[anchors.length-1].children.push(info);
      }
      else {
        anchors.push(info);
      }
    }
  }
});

/*
 * PLUGIN : FRONTMATTER
 * Extracts frontmatter from file.
 */

var frontmatter;
md.use(mdFrontmatter, fm => {
  frontmatter = fm;
});

// md.use(mdContainer, 'guideline', {
//   render: function(tokens, idx) {
//     var m = tokens[idx].info.trim().match(/^guideline\s+(.*)$/);
//     console.log(m[1]);
//   }
// });

/*
 * PLUGIN : HEADINGS
 * Remap markdown headers to h2-h4 for design and accessibility reasons. After
 * '###', headers will just be returned as <p> tags to avoid deep nesting.
 */

const headerTags = {
  '#'     : 'h3',
  '##'    : 'h4',
  '###'   : 'h4',
  '####'  : 'p',
  '#####' : 'p'
};

md.renderer.rules.heading_open = function(tokens, idx, options, env, self) {
  if (headerTags[tokens[idx].markup]) {
    tokens[idx].tag = headerTags[tokens[idx].markup];
  }

  return md.renderer.renderToken(tokens, idx, options, env, self);
};

md.renderer.rules.heading_close = function(tokens, idx, options, env, self) {
  if (headerTags[tokens[idx].markup]) {
    tokens[idx].tag = headerTags[tokens[idx].markup];
  }

  return md.renderer.renderToken(tokens, idx, options, env, self);
};

/*
 * PLUGIN: CODE BLOCKS
 * Wrap code blocks in a <px-catalog-code-snippet> tag.
 */
var logged = false;
md.renderer.rules.fence = function(tokens, idx, options, env, self) {
  var token = tokens[idx],
      info = token.info ? md.utils.unescapeAll(token.info).trim() : '',
      langName = '',
      highlighted, i, tmpAttrs, tmpToken;

  if (info) {
    langName = info.split(/\s+/g)[0];
  }

  if(!logged){
    logged = true;
  }

  // Replace and closing script tags with escaped closing script tags,
  // the code highlighter will unescape. If we don't do this then the code
  // might close the script tag in the page and start printing random stuff.
  const code = token.content.replace(/\<\/script\>/g, '<\/script>');

  return `
    <px-catalog-code-snippet language="${langName}">
      <script type="text/code">
${token.content}
      </script>
    </px-catalog-code-snippet>
  `.trim();
};

md.renderer.rules.code_inline = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<code class="code code--inline"' + slf.renderAttrs(token) + '>' +
          md.utils.escapeHtml(tokens[idx].content) +
          '</code>';
};

var lastTag;
md.use(mdContainer, 'element', {
  render: function (tokens, idx) {
    var info = tokens[idx].info.trim().match(/^element\s+(.*)$/);
    var tag = null;
    var attrs = null;
    if (info && info[1]) {
      var split = info[1].split(' ');
      tag = split[0];
      lastTag = tag;
      attrs = split.slice(1, split.length).join(' ');
    }

    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<${tag} ${attrs}>`;
    } else {
      // closing tag
      return `</${lastTag}>\n`;
    }
  }
});

exports = module.exports = function processMarkdownFileText(fileText) {
  anchors = [];
  frontmatter = null;
  const rendered = md.render(fileText);
  frontmatter = (frontmatter !== null) ? yaml.load(frontmatter) : {};
  return {
    content: rendered,
    metadata: frontmatter,
    anchors: anchors
  };
};
