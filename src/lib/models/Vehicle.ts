import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, 'Please provide a vehicle number'],
    unique: true,
  },
  type: {
    type: String,
    required: [true, 'Please provide a vehicle type'],
    enum: ['bus', 'truck', 'van', 'car'],
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide vehicle capacity'],
  },
  status: {
    type: String,
    enum: ['available', 'in-use', 'maintenance', 'out-of-service'],
    default: 'available',
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastMaintenance: {
    type: Date,
  },
  nextMaintenance: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema); 