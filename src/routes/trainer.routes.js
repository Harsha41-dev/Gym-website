import { Router } from "express";
import {
    getDashboard,
    getProfile,
    updateProfile,
    getPlans,
    createPlan,
    getPlan,
    updatePlan,
    deletePlan,
    getBookings,
    updateBookingStatus
} from "../controllers/trainer.controller.js";

const router = Router();

// Middleware to check if user is logged in and is a trainer
const isTrainer = (req, res, next) => {
    if (!req.session || !req.session.userId || req.session.userRole !== "trainer") {
        return res.redirect("/auth/login");
    }
    next();
};

// Apply middleware to all routes
router.use(isTrainer);

// Dashboard
router.get("/dashboard", getDashboard);

// Profile
router.get("/profile", getProfile);
router.post("/profile", updateProfile);

// Plans
router.get("/plans", getPlans);
router.post("/plans", createPlan);
router.get("/plans/:planId", getPlan);
router.post("/plans/:planId", updatePlan);
router.post("/plans/:planId/delete", deletePlan);

// Bookings
router.get("/bookings", getBookings);
router.post("/bookings/:bookingId", updateBookingStatus);
router.get("/bookings/confirm/:bookingId", (req, res) => {
    req.body = { status: "confirmed" };
    updateBookingStatus(req, res);
});
router.get("/bookings/cancel/:bookingId", (req, res) => {
    req.body = { status: "cancelled" };
    updateBookingStatus(req, res);
});
router.get("/bookings/complete/:bookingId", (req, res) => {
    req.body = { status: "completed" };
    updateBookingStatus(req, res);
});

export default router; 