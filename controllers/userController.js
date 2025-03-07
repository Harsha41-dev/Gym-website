import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Plan from '../models/planModel.js';
import Booking from '../models/bookingModel.js';

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.session.userId;
    // Example: Fetch the user's active plans
    const plans = await Plan.find({ userId }).populate('trainerId');
    res.render('pages/userDashboard', { plans });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Show booking page
export const getBookingPage = (req, res) => {
  res.render('pages/booking');
};

// Handle booking form submission
export const postBooking = async (req, res) => {
  try {
    const { trainerId, date, timeSlot } = req.body;
    await Booking.create({
      userId: req.session.userId,
      trainerId,
      date,
      timeSlot
    });
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Show feedback form
export const getFeedbackPage = (req, res) => {
  res.render('pages/feedback');
};

// Post feedback to a plan
export const postFeedback = async (req, res) => {
  try {
    const { planId, feedback } = req.body;
    if (!mongoose.Types.ObjectId.isValid(planId)) {
      return res.status(400).send('Invalid Plan ID');
    }
    await Plan.findByIdAndUpdate(planId, { feedback });
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update user calories
export const updateCalories = async (req, res) => {
  try {
    const { calories } = req.body;
    const userId = req.session.userId;
    await User.findByIdAndUpdate(userId, { calories });
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};