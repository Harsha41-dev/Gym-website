import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Plan from "../models/plan.model.js";
import Booking from "../models/booking.model.js";

// Get admin dashboard
export const getDashboard = asyncHandler(async (req, res) => {
    const adminId = req.session.userId;
    
    // Get admin details
    const admin = await User.findById(adminId);
    
    if (!admin || admin.role !== "admin") {
        throw new ApiError(403, "Access denied");
    }
    
    // Get stats
    const userCount = await User.countDocuments({ role: "user" });
    const trainerCount = await User.countDocuments({ role: "trainer" });
    const pendingTrainerCount = await User.countDocuments({ 
        role: "trainer", 
        status: "pending" 
    });
    const planCount = await Plan.countDocuments();
    const bookingCount = await Booking.countDocuments();
    
    // Get recent users
    const recentUsers = await User.find()
        .sort({ createdAt: -1 })
        .limit(5);
    
    // Get pending trainers
    const pendingTrainers = await User.find({ 
        role: "trainer", 
        status: "pending" 
    })
    .sort({ createdAt: -1 });
    
    res.render("pages/adminDashboard", {
        title: "Admin Dashboard - FitSync",
        stats: {
            userCount,
            trainerCount,
            pendingTrainerCount,
            planCount,
            bookingCount
        },
        recentUsers,
        pendingTrainers,
        isLoggedIn: true,
        userRole: req.session.userRole,
        userId: req.session.userId,
    });
});

// Get users list
export const getUsers = asyncHandler(async (req, res) => {
    const { status, sort, page = 1, limit = 10 } = req.query;
    
    // Build query - only show members (users with role 'user')
    const query = { role: "user" };
    if (status) query.status = status;
    
    // Count total users
    const totalUsers = await User.countDocuments(query);
    
    // Sort options
    let sortOption = { createdAt: -1 }; // Default sort
    if (sort === "name") sortOption = { name: 1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get users
    const users = await User.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
    
    res.render("pages/adminUsers", {
        title: "Manage Users - FitSync",
        users,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalUsers / parseInt(limit)),
            totalUsers
        },
        filters: { status, sort },
        isLoggedIn: true,
        userRole: req.session.userRole,
        userId: req.session.userId,
    });
});

// Get user details
export const getUserDetails = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    // Get user
    const user = await User.findById(userId);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    // Get user's plans if they're a trainer
    let plans = [];
    if (user.role === "trainer") {
        plans = await Plan.find({ creator: userId });
    }
    
    // Get user's bookings
    const bookings = await Booking.find({
        $or: [
            { user: userId },
            { trainer: userId }
        ]
    })
    .populate("user", "name")
    .populate("trainer", "name")
    .sort({ startTime: -1 });
    
    res.render("pages/editProfile", {
        title: `${user.name} - FitSync Admin`,
        user,
        plans,
        bookings,
        isAdmin: true,
        isLoggedIn: true,
        userRole: req.session.userRole,
        userId: req.session.userId,
    });
});

// Update user status
export const updateUserStatus = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    // Update status
    user.status = status;
    await user.save();
    
    // Handle API or form submission
    if (req.headers['content-type'] === 'application/json') {
        return res.status(200).json(
            new ApiResponse(200, user, "User status updated successfully")
        );
    } else {
        return res.redirect(`/admin/users/${userId}?success=User status updated successfully`);
    }
});

// Get plans list
export const getPlans = asyncHandler(async (req, res) => {
    const { category, level, creator, isActive, sort, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    if (creator) query.creator = creator;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    
    // Count total plans
    const totalPlans = await Plan.countDocuments(query);
    
    // Sort options
    let sortOption = { createdAt: -1 }; // Default sort
    if (sort === "title") sortOption = { title: 1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "popular") sortOption = { enrollmentCount: -1 };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get plans
    const plans = await Plan.find(query)
        .populate("creator", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
    
    // Get categories and levels for filters
    const categories = await Plan.distinct("category");
    const levels = await Plan.distinct("level");
    
    // Get trainers for filter
    const trainers = await User.find({ role: "trainer" })
        .select("name")
        .sort({ name: 1 });
    
    res.render("pages/courses", {
        title: "Manage Plans - FitSync",
        plans,
        categories,
        levels,
        trainers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalPlans / parseInt(limit)),
            totalPlans
        },
        filters: { category, level, creator, isActive, sort },
        isAdmin: true,
        isLoggedIn: true,
        userRole: req.session.userRole,
        userId: req.session.userId,
    });
});

// Get bookings list
export const getBookings = asyncHandler(async (req, res) => {
    const { status, user, trainer, startDate, endDate, sort, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (user) query.user = user;
    if (trainer) query.trainer = trainer;
    
    // Date range filter
    if (startDate || endDate) {
        query.startTime = {};
        if (startDate) query.startTime.$gte = new Date(startDate);
        if (endDate) query.startTime.$lte = new Date(endDate);
    }
    
    // Count total bookings
    const totalBookings = await Booking.countDocuments(query);
    
    // Sort options
    let sortOption = { startTime: -1 }; // Default sort
    if (sort === "date-asc") sortOption = { startTime: 1 };
    if (sort === "date-desc") sortOption = { startTime: -1 };
    if (sort === "status") sortOption = { status: 1 };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get bookings
    const bookings = await Booking.find(query)
        .populate("user", "name")
        .populate("trainer", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
    
    // Get users and trainers for filters
    const users = await User.find({ role: "user" })
        .select("name")
        .sort({ name: 1 });
        
    const trainers = await User.find({ role: "trainer" })
        .select("name")
        .sort({ name: 1 });
    
    res.render("pages/adminBookings", {
        title: "Manage Bookings - FitSync",
        bookings,
        users,
        trainers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalBookings / parseInt(limit)),
            totalBookings
        },
        filters: { status, user, trainer, startDate, endDate, sort },
        isAdmin: true,
        isLoggedIn: true,
        userRole: req.session.userRole,
        userId: req.session.userId,
    });
});

// Approve trainer
export const approveTrainer = asyncHandler(async (req, res) => {
    const { trainerId } = req.params;
    
    // Find trainer
    const trainer = await User.findById(trainerId);
    
    if (!trainer || trainer.role !== "trainer") {
        throw new ApiError(404, "Trainer not found");
    }
    
    // Update status
    trainer.status = "active";
    await trainer.save();
    
    return res.redirect("/admin/dashboard?message=Trainer approved successfully");
});

// Reject trainer
export const rejectTrainer = asyncHandler(async (req, res) => {
    const { trainerId } = req.params;
    
    // Find trainer
    const trainer = await User.findById(trainerId);
    
    if (!trainer || trainer.role !== "trainer") {
        throw new ApiError(404, "Trainer not found");
    }
    
    // Update status
    trainer.status = "rejected";
    await trainer.save();
    
    return res.redirect("/admin/dashboard?message=Trainer rejected");
});

// Toggle trainer status (active/inactive)
export const toggleTrainerStatus = asyncHandler(async (req, res) => {
    const { trainerId } = req.params;
    
    // Find trainer
    const trainer = await User.findById(trainerId);
    
    if (!trainer || trainer.role !== "trainer") {
        throw new ApiError(404, "Trainer not found");
    }
    
    // Toggle status
    trainer.status = trainer.status === "active" ? "inactive" : "active";
    await trainer.save();
    
    const message = trainer.status === "active" 
        ? "Trainer activated successfully" 
        : "Trainer deactivated successfully";
    
    return res.redirect("/admin/dashboard?message=" + message);
});

// Get trainers list
export const getTrainers = asyncHandler(async (req, res) => {
    const { status, sort, page = 1, limit = 10, message } = req.query;
    
    // Build query - only show trainers
    const query = { role: "trainer" };
    if (status) query.status = status;
    
    // Count total trainers
    const totalTrainers = await User.countDocuments(query);
    
    // Sort options
    let sortOption = { createdAt: -1 }; // Default sort
    if (sort === "name") sortOption = { name: 1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get trainers
    const trainers = await User.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
    
    res.render("pages/adminTrainers", {
        title: "Manage Trainers - FitSync",
        trainers,
        message: message || null,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalTrainers / parseInt(limit)),
            totalTrainers
        },
        filters: { status, sort },
        isLoggedIn: true,
        userRole: req.session.userRole,
        userId: req.session.userId,
    });
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { trainerId } = req.params;
    
    // Determine which ID to use (userId or trainerId)
    const id = userId || trainerId;
    
    // Find user
    const user = await User.findById(id);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    // Delete associated bookings
    await Booking.deleteMany({
        $or: [
            { user: id },
            { trainer: id }
        ]
    });
    
    // If user is trainer, delete their plans
    if (user.role === "trainer") {
        await Plan.deleteMany({ creator: id });
    }
    
    // Delete user
    await User.findByIdAndDelete(id);
    
    // Redirect with success message based on user role
    if (user.role === "trainer") {
        return res.redirect("/admin/trainers?message=Trainer deleted successfully");
    } else {
        return res.redirect("/admin/users?message=User deleted successfully");
    }
}); 