import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  userId: { // Link to user collection (the same user doc, but role=trainer)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expertise: { type: String, default: '' },
  // You can add more trainer-specific fields here
});

const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;