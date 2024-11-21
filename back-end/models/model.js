const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Password validator function
const passwordValidator = (password) => {
  return /^[A-Z]/.test(password);
};

// User schema
const UserSchema = new mongoose.Schema({
  username: { 
    type: String,  
    maxlength: [30, 'Username cannot exceed 30 characters'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    maxlength: [50, 'Email cannot exceed 50 characters'],
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
    maxlength: [50, 'Password cannot exceed 50 characters'],
    unique: true, 
    validate: {
      validator: passwordValidator,
      message: 'Password must start with an uppercase letter'
    }
  },
  favoriteTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }], // Array of favorite trips
  bookedTrips: [{
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }, // Trip that was booked
    booking_date: { type: Date, default: Date.now }, // Date when the trip was booked
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' } // Booking status
  }]
});

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

// Trip schema
const TripSchema = new mongoose.Schema({
  img: String,
  destination: String,
  price: Number,
  duration: Number,
  trip_date: String,
  country: String,
  description: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  bookings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    booking_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' } 
  }]
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = { User, Trip };
