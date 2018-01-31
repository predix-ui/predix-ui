exports = module.exports = function getComponentAndEntrypoint(obj){
    var toReturn = [];

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if ((typeof obj[i]) == 'object') {
            var flatObject = getComponentAndEntrypoint(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn = toReturn.concat(flatObject[x]);
            }
        } else {

          if (i === 'entrypoint' && obj[i].includes('bower_components')){
            toReturn.push({
              'componentName' : obj.path,
              'label': obj.label,
              'tags': obj.tags,
              'subcomponent': obj.subcomponent,
              'entryPoint' : obj[i].replace('/bower_components', 'bower_components')
            });
          }
        }
    }
    return toReturn;
};
