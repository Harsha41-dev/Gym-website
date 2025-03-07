// routes/trainerRoutes.js
import express from 'express';
import { getTrainerDashboard, createPlan, postFeedback } from '../controllers/trainerController.js';
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', isAuthenticated, hasRole('trainer'), getTrainerDashboard);

router.post('/plan', isAuthenticated, hasRole('trainer'), createPlan);

router.post('/feedback', isAuthenticated, hasRole('trainer'), postFeedback);

export default router;
