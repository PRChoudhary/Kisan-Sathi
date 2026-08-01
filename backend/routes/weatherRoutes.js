const express = require('express');
const router = express.Router();
const { getWeatherByCoords, searchWeatherCity } = require('../controllers/weatherController');

router.get('/', getWeatherByCoords);
router.get('/search', searchWeatherCity);

module.exports = router;
