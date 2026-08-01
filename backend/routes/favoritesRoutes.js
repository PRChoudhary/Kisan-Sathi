const express = require('express');
const router = express.Router();
const {
  getFavoriteCrops,
  addFavoriteCrop,
  removeFavoriteCrop,
  getFavoriteLocations,
  addFavoriteLocation,
  removeFavoriteLocation
} = require('../controllers/favoritesController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.use(optionalAuth);

router.get('/crops', getFavoriteCrops);
router.post('/crops', addFavoriteCrop);
router.delete('/crops/:id', removeFavoriteCrop);

router.get('/locations', getFavoriteLocations);
router.post('/locations', addFavoriteLocation);
router.delete('/locations/:id', removeFavoriteLocation);

module.exports = router;
