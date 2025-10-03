import { Router } from "express";
import {
    getDashboard,
    getUsers,
    getUserDetails,
    updateUserStatus,
    getPlans,
    getBookings,
    approveTrainer,
    rejectTrainer,
    toggleTrainerStatus,
    getTrainers,
    deleteUser
} from "../controllers/admin.controller.js";

const router = Router();

// Middleware to check if user is logged in and is an admin
const isAdmin = (req, res, next) => {
    if (!req.session || !req.session.userId || req.session.userRole !== "admin") {
        return res.redirect("/auth/login");
    }
    next();
};

// Apply middleware to all routes
router.use(isAdmin);

// Dashboard
router.get("/dashboard", getDashboard);

// Users
router.get("/users", getUsers);
router.get("/users/:userId", getUserDetails);
router.post("/users/:userId/status", updateUserStatus);
router.get("/users/delete/:userId", deleteUser);

// Trainers
router.get("/trainers", getTrainers);
router.get("/trainers/approve/:trainerId", approveTrainer);
router.get("/trainers/reject/:trainerId", rejectTrainer);
router.get("/trainers/toggle-status/:trainerId", toggleTrainerStatus);
router.get("/trainers/delete/:trainerId", deleteUser);

// Plans
router.get("/plans", getPlans);

// Bookings
router.get("/bookings", getBookings);

export default router; 