import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // or 'Trainer' if you prefer
  },
  workoutDetails: String,
  dietDetails: String,
  feedback: String, // Trainer or user feedback
  startDate: Date,
  endDate: Date
});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
