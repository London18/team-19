var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./js/index.js');
var socket = require('./config/socket.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'custom')));
console.log('Server Started at Port 4000');

app.use('/', index);
socket.conn();
socket.fromClient();

app.use(function(req, res, next) {
	var err = new Error('404 Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
  	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
  	res.render('error');
});

module.exports = app;

