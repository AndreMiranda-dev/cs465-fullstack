var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');

// Handlebars
var handlebars = require('hbs');

var app = express();

// ===== VIEW ENGINE SETUP =====
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');

// Register the eq helper
handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

// ===== MIDDLEWARE =====
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ===== ROUTES =====
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// ===== ERROR HANDLING =====

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
