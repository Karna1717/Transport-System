import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'Please provide a route'],
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Please provide a vehicle'],
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a driver'],
  },
  departureTime: {
    type: Date,
    required: [true, 'Please provide departure time'],
  },
  arrivalTime: {
    type: Date,
    required: [true, 'Please provide arrival time'],
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  passengers: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema); 