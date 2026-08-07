// Initializes the Express application and configures all middleware, routing, and error handling.

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

// Sets up Handlebars view engine and template locations.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Registers reusable Handlebars partial templates.
handlebars.registerPartials(__dirname + '/app_server/views/partials');

// Adds custom Handlebars helpers for template logic.
handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

// Registers core Express middleware for logging, parsing, and static assets.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enables CORS for cross‑origin API access.
const cors = require('cors');
app.use(cors());

// Allows additional HTTP methods for API operations.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Disables caching for API responses to ensure fresh data.
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// Registers all application routes for server‑side pages and API endpoints.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// Handles 404 errors for missing pages or endpoints.
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

// Handles server errors and formats API vs. page responses appropriately.
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] SERVER ERROR:`, err);

  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({
      status: 500,
      message: 'API server error',
      error: err
    });
  }

  res.status(500).render('error', {
    title: 'Server Error',
    message: 'Something went wrong on the server.'
  });
});

module.exports = app;
