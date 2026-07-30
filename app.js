var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./app_api/models/db');

// Routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

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
app.use('/api', apiRouter);

// ===== GLOBAL ERROR HANDLING =====

// 404 Handler (No route matched)
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist.'
    });
});

// 500 Handler (Unhandled server errors)
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] SERVER ERROR:`, err.message);

    res.status(500).render('error', {
        title: 'Server Error',
        message: 'Something went wrong on the server.'
    });
});

module.exports = app;
