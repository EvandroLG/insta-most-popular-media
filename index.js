var express = require('express');
var app = express();
var config = require('./config');
var path = require('path');


app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
  res.redirect(config.authorizeURL);
});

app.get('/authorized/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000);
