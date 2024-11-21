const express = require('express');
const { register, login, getUser } = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getUser);

module.exports = router;
