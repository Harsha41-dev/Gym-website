import { Router } from "express";
import {
    getDashboard,
    getProfile,
    updateProfile,
    getEnrolledPlans,
    enrollInPlan,
    cancelEnrollment,
    getBookings,
    createBooking,
    cancelBooking,
    getBookingForm
} from "../controllers/user.controller.js";
import { checkLoginStatus } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// Middleware to check if user is logged in and is a regular user
const isUser = (req, res, next) => {
    if (!req.session || !req.session.userId || req.session.userRole !== "user") {
        return res.redirect("/auth/login");
    }
    next();
};

// Apply middleware to all routes
router.use(isUser);

// Dashboard
router.get("/dashboard", getDashboard);

// Profile
router.get("/profile", getProfile);
router.post("/profile", updateProfile);

// Plans
router.get("/plans", getEnrolledPlans);
router.post("/plans/enroll/:planId", enrollInPlan);
router.get("/plans/unenroll/:planId", cancelEnrollment);

// Bookings
router.get("/bookings", getBookings);
router.post("/bookings", createBooking);
router.post("/bookings/:bookingId/cancel", cancelBooking);

// Booking form for specific plan
router.get("/book/:planId", getBookingForm);

export default router;