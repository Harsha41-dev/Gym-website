import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // or 'Trainer'
  },
  date: Date,
  timeSlot: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
