var url = require('url');
var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

var inc = 2;

var transactions = [
  {id:1, amount: 100, bankId: 1}, 
  {id:2, amount: 200, bankId: 2}
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'static')));

app.post('/auth/login', function(req, res) {
  console.log(req.body);
  var user = req.body.username;
  var pass = req.body.password;
  if (user === 'admin' && pass === 'admin') {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get('/banks', function(req, res) {
  res.send({banks: ["Сбербанк","ВТБ","АльфаБанк","Тинькофф","МКБ"]});
});

app.post('/transaction', function(req, res) {
  console.log(req.body);
  transactions.push({id: ++inc, amount: req.body.amount, bankId: req.body.bankId})
  res.sendStatus(200);
});

app.post('/delete_transaction', function(req, res) {
  transactions.splice(parseInt(req.body.count), 1);
  res.sendStatus(200);
});


app.get('/transactions', function(req, res) {
  res.send({transactions: transactions});
});

app.listen(3000, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});