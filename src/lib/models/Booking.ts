import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'picked_up', 'in_transit', 'delivered'],
    default: 'pending',
  },
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  packageType: {
    type: String,
    enum: ['standard', 'express', 'fragile', 'large'],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  estimatedDeliveryDate: {
    type: Date,
    required: true,
  },
  actualDeliveryDate: {
    type: Date,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking; 