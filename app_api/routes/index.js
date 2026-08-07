// Declares all Trip API routes and maps them to their corresponding controller actions.

const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const travelController = require('../../app_server/controllers/travel');

// Returns all trips from the API.
router.get('/trips', tripsController.tripsList);

// Returns a single trip using its unique trip code.
router.get('/trips/:code', tripsController.tripsFindByCode);

// Returns a single trip using its slug for detailed API access.
router.get('/trips/details/:slug', tripsController.tripsFindBySlug);

// Creates a new trip using data provided in the request body.
router.post('/trips', tripsController.tripsAddTrip);

// Updates an existing trip using its trip code.
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

module.exports = router;
