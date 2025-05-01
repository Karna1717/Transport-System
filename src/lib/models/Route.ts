import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a route name'],
    unique: true,
  },
  startLocation: {
    type: String,
    required: [true, 'Please provide a start location'],
  },
  endLocation: {
    type: String,
    required: [true, 'Please provide an end location'],
  },
  distance: {
    type: Number,
    required: [true, 'Please provide the distance in kilometers'],
  },
  estimatedTime: {
    type: Number,
    required: [true, 'Please provide estimated time in minutes'],
  },
  stops: [{
    name: String,
    arrivalTime: String,
    departureTime: String,
  }],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Route || mongoose.model('Route', routeSchema); 