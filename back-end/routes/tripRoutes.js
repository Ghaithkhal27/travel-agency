const express = require('express');
const {
  getAllTrips,
  getFavoriteTrips,
  getBookedTrips,
} = require('../controllers/tripController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllTrips);
router.get('/favorites', protect, getFavoriteTrips);
router.get('/bookings', protect, getBookedTrips);

module.exports = router;
