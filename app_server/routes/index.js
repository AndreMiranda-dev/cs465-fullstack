const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');
const tripsController = require('../controllers/trips');

// Static pages
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);
router.get('/contact', ctrlMain.contact);
router.get('/meals', ctrlMain.meals);
router.get('/news', ctrlMain.news);
router.get('/rooms', ctrlMain.rooms);

// Trips API endpoints
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// Dynamic pages
router.get('/travel', ctrlTravel.travel);

module.exports = router;
