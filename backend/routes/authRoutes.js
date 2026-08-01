const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleLogin, phoneOtpLogin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/phone-otp', phoneOtpLogin);
router.get('/me', protect, getMe);

module.exports = router;
