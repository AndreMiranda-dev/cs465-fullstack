// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const handlebars = require('hbs');

// -----------------------------
// Load MongoDB + Models FIRST
// -----------------------------
require('./app_api/models/db');
require('./app_api/models/user');

// -----------------------------
// Load Passport AFTER models
// -----------------------------
const passport = require('passport');
require('./app_api/config/passport');

// -----------------------------
// Routers
// -----------------------------
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

// -----------------------------
// Initialize Express
// -----------------------------
const app = express();

// -----------------------------
// View Engine (Handlebars)
// -----------------------------
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

handlebars.registerPartials(__dirname + '/app_server/views/partials');
handlebars.registerHelper('eq', (a, b) => a === b);

// -----------------------------
// Core Middleware
// -----------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------
// Passport Initialization
// -----------------------------
app.use(passport.initialize());

// -----------------------------
// CORS + API Headers
// -----------------------------
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Disable caching for API responses
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// -----------------------------
// Routes
// -----------------------------
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// -----------------------------
// JWT Unauthorized Handler
// -----------------------------
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: err.name + ': ' + err.message
    });
  }
  next(err);
});

// -----------------------------
// 404 Handler
// -----------------------------
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

// -----------------------------
// General Error Handler
// -----------------------------
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
