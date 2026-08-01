const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/aiController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.use(optionalAuth);

router.post('/chat', chatWithAI);

module.exports = router;
