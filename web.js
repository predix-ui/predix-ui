prpl = require('prpl-server');
express = require('express');

const app = express();

app.get('/*', prpl.makeHandler('.', {
  builds: [
    {name: 'default', browserCapabilities: ['es2015', 'push']},
    {name: 'es5'},
  ],
}));

var port = Number(process.env.PORT || 8080);

app.listen(port);
