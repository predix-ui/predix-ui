// const path = require('path');
// const fs = require('fs');
const render = require('./renderer');
const template = require('./templates');

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

// const source = readFile(path.join(__dirname, '..', '_pages', 'typography.md'));
// const source = readFile(path.join(__dirname, '..', '_pages', 'developer-guides', 'data-visualization', 'configuring-charts.md'));
// const parsed = render(source);
// console.log(template.view(parsed));

function fromText(source) {
  return new Promise((resolve, reject) => {
    const parsed = render(source);
    const templated = template.default(parsed);
    resolve(templated);
  });
};

exports = module.exports = {
  fromText: fromText
};
