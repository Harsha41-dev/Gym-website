// controllers/trainerController.js
import User from '../models/userModel.js';
import Plan from '../models/planModel.js';
import Booking from '../models/bookingModel.js';

export const getTrainerDashboard = async (req, res) => {
  try {
    const trainerId = req.session.userId;
    // Example: Fetch all plans assigned to this trainer
    const plans = await Plan.find({ trainerId }).populate('userId');
    // Example: Fetch all bookings for this trainer
    const bookings = await Booking.find({ trainerId }).populate('userId');
    res.render('pages/trainerDashboard', { plans, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Create a new plan for a user
export const createPlan = async (req, res) => {
  try {
    const { userId, workoutDetails, dietDetails, startDate, endDate } = req.body;
    const trainerId = req.session.userId;
    await Plan.create({
      userId,
      trainerId,
      workoutDetails,
      dietDetails,
      startDate,
      endDate
    });
    res.redirect('/trainer/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Provide feedback to user on their plan
export const postFeedback = async (req, res) => {
  try {
    const { planId, feedback } = req.body;
    await Plan.findByIdAndUpdate(planId, { feedback });
    res.redirect('/trainer/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
