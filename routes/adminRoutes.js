import express from 'express';
import { getAdminDashboard, getAllUsers, deleteUser } from '../controllers/adminController.js';
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', isAuthenticated, hasRole('admin'), getAdminDashboard);

router.get('/users', isAuthenticated, hasRole('admin'), getAllUsers);
router.get('/users/delete/:id', isAuthenticated, hasRole('admin'), deleteUser);

// Add more admin routes (updateUser, manageTrainers, analytics, etc.)

export default router;