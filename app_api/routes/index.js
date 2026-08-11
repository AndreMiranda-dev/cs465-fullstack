// API Routes for Travlr Getaways

const express = require('express');
const router = express.Router();

// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// -----------------------------------------
// JWT AUTHENTICATION MIDDLEWARE
// -----------------------------------------

function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if (headers.length < 2) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = headers[1];

    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(401).json('Unauthorized: Token Validation Error!');
        }
        req.auth = verified; // Store decoded token on request
        next(); // Continue to controller
    });
}

// -----------------------------
// AUTHENTICATION ROUTES
// -----------------------------

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// -----------------------------
// TRIP ROUTES
// -----------------------------

// Get all trips
router.get('/trips', tripsController.tripsList);

// Get a trip by its unique trip code
router.get('/trips/:code', tripsController.tripsFindByCode);

// Get a trip by slug (detailed API access)
router.get('/trips/details/:slug', tripsController.tripsFindBySlug);

// Create a new trip (PROTECTED)
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);

// Update an existing trip by trip code (PROTECTED)
router.put('/trips/:tripCode', authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
