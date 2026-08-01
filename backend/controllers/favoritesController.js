const prisma = require('../config/db');

// In-memory fallback
let guestFavCrops = [];
let guestFavLocations = [];

// CROPS
const getFavoriteCrops = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      try {
        const favs = await prisma.favoriteCrop.findMany({ where: { userId: req.user.id } });
        return res.json({ success: true, data: favs });
      } catch (err) {}
    }
    res.json({ success: true, data: guestFavCrops });
  } catch (error) {
    next(error);
  }
};

const addFavoriteCrop = async (req, res, next) => {
  try {
    const { cropName, state, district, market } = req.body;
    if (!cropName) {
      return res.status(400).json({ success: false, message: 'Crop name is required' });
    }

    if (req.user && req.user.id) {
      try {
        const fav = await prisma.favoriteCrop.create({
          data: { userId: req.user.id, cropName, state, district, market }
        });
        return res.status(201).json({ success: true, data: fav });
      } catch (err) {}
    }

    const guestFav = { id: `fav-crop-${Date.now()}`, cropName, state, district, market };
    guestFavCrops.push(guestFav);
    res.status(201).json({ success: true, data: guestFav });
  } catch (error) {
    next(error);
  }
};

const removeFavoriteCrop = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user && req.user.id && !id.startsWith('fav-crop-')) {
      try {
        await prisma.favoriteCrop.delete({ where: { id, userId: req.user.id } });
        return res.json({ success: true, message: 'Removed favorite crop' });
      } catch (err) {}
    }
    guestFavCrops = guestFavCrops.filter(c => c.id !== id);
    res.json({ success: true, message: 'Removed favorite crop' });
  } catch (error) {
    next(error);
  }
};

// LOCATIONS
const getFavoriteLocations = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      try {
        const locs = await prisma.favoriteLocation.findMany({ where: { userId: req.user.id } });
        return res.json({ success: true, data: locs });
      } catch (err) {}
    }
    res.json({ success: true, data: guestFavLocations });
  } catch (error) {
    next(error);
  }
};

const addFavoriteLocation = async (req, res, next) => {
  try {
    const { locationName, latitude, longitude, state } = req.body;
    if (!locationName || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Location name and coordinates required' });
    }

    if (req.user && req.user.id) {
      try {
        const loc = await prisma.favoriteLocation.create({
          data: {
            userId: req.user.id,
            locationName,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            state
          }
        });
        return res.status(201).json({ success: true, data: loc });
      } catch (err) {}
    }

    const guestLoc = { id: `fav-loc-${Date.now()}`, locationName, latitude, longitude, state };
    guestFavLocations.push(guestLoc);
    res.status(201).json({ success: true, data: guestLoc });
  } catch (error) {
    next(error);
  }
};

const removeFavoriteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user && req.user.id && !id.startsWith('fav-loc-')) {
      try {
        await prisma.favoriteLocation.delete({ where: { id, userId: req.user.id } });
        return res.json({ success: true, message: 'Removed favorite location' });
      } catch (err) {}
    }
    guestFavLocations = guestFavLocations.filter(l => l.id !== id);
    res.json({ success: true, message: 'Removed favorite location' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavoriteCrops,
  addFavoriteCrop,
  removeFavoriteCrop,
  getFavoriteLocations,
  addFavoriteLocation,
  removeFavoriteLocation
};
