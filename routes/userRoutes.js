// routes/userRoutes.js
import express from 'express';
import { getUserDashboard, getBookingPage, postBooking, getFeedbackPage, postFeedback, updateCalories } from '../controllers/userController.js';
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect these routes, only for role=user
router.get('/dashboard', isAuthenticated, hasRole('user'), getUserDashboard);

router.get('/booking', isAuthenticated, hasRole('user'), getBookingPage);
router.post('/booking', isAuthenticated, hasRole('user'), postBooking);

router.get('/feedback', isAuthenticated, hasRole('user'), getFeedbackPage);
router.post('/feedback', isAuthenticated, hasRole('user'), postFeedback);

router.post('/calories', isAuthenticated, hasRole('user'), updateCalories);

export default router;
