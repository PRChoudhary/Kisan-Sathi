const express = require('express');
const router = express.Router();
const { getMandiPrices, searchMandiPrices } = require('../controllers/mandiController');

router.get('/', getMandiPrices);
router.get('/search', searchMandiPrices);

module.exports = router;
