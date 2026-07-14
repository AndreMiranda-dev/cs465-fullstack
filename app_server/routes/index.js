const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');

// Static pages
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);
router.get('/contact', ctrlMain.contact);
router.get('/meals', ctrlMain.meals);
router.get('/news', ctrlMain.news);
router.get('/rooms', ctrlMain.rooms);

// Dynamic pages
router.get('/travel', ctrlTravel.travel);

module.exports = router;
