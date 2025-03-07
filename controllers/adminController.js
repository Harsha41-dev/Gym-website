// controllers/adminController.js
import User from '../models/userModel.js';
import Trainer from '../models/trainerModel.js';
// For analytics, you might need Plan, Booking, etc.

export const getAdminDashboard = async (req, res) => {
  try {
    // Example: fetch basic stats
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalTrainers = await User.countDocuments({ role: 'trainer' });
    // Could also fetch revenue, user engagement, etc.

    res.render('pages/adminDashboard', {
      totalUsers,
      totalTrainers
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// CRUD operations for Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('pages/analytics', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Similarly, you can do updateUser, createTrainer, etc.