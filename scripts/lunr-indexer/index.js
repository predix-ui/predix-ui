const uuid = require('uuid/v4');
const lunr = require('lunr');

class LunrIndexer {
  constructor() {
    this._entries = [];
  }

  add(analysisForFile) {
    if (!analysisForFile.elements || !analysisForFile.elements.length) return;

    for (let {tagname, properties, methods, events} of analysisForFile.elements) {
      this._addEntries(tagname, 'property', properties);
      this._addEntries(tagname, 'method',   methods);
      this._addEntries(tagname, 'event',    events);
    }
  }

  _addEntries(component, type, entries) {
    for (let entry of entries) {
      if (entry.privacy !== 'public') continue;
      this._entries.push({
        id: uuid(),
        type,
        component,
        name: entry.name,
        descriptor: entry
      });
    }
  }

  export() {
    var entries = this._entries;

    const index = lunr(function() {
      this.ref('id');
      this.field('name');
      this.field('component');
      this.field('componentExact');
      this.field('type');

      for (let entry of entries) {
        this.add({
          id: entry.id,
          name: entry.name,
          component: entry.component,
          componentExact: [entry.component],
          type: entry.type
        });
      }
    });

    const source = {
      documents: entries,
      index: entries.reduce((acc, {id}, i) => {
        acc[id] = i;
        return acc;
      }, {})
    };

    return {index, source};
  }
}

exports = module.exports = LunrIndexer;
