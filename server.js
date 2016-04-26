var url = require('url');
var path = require('path');
var express = require('express');
var request = require('request');
var webpack = require('webpack');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var compiler = webpack(config);

app.use(bodyParser());
app.use(cookieParser());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.post('/auth/login', function(req, res) {
  var user = req.body.username;
  var pass = req.body.password;
  if (user === 'admin' && pass === 'admin') {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.listen(3000, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});