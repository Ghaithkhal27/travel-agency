const { Trip } = require('../models/Trip');
const { User } = require('../models/User');

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get favorite trips for a user
exports.getFavoriteTrips = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteTrips');
    res.json(user.favoriteTrips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get booked trips for a user
exports.getBookedTrips = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookedTrips.trip');
    res.json(user.bookedTrips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
