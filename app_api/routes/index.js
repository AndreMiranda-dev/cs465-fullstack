const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const travelController = require('../../app_server/controllers/travel');

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET one trip by code
router.get('/trips/:code', tripsController.tripsFindByCode);

// GET one trip by slug (API)
router.get('/trips/details/:slug', tripsController.tripsFindBySlug);

module.exports = router;
