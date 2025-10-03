import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import Product from "../models/product.model.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import Cart from "../models/cart.model.js";

const router = Router();

// Home page route
router.get("/", asyncHandler(async (req, res) => {
    // Get courses
    const courses = await Course.find({ isActive: true });
    
    // Get top trainers
    const topTrainers = await User.find({ 
        role: "trainer", 
        status: "active" 
    })
    .limit(4)
    .select("name specializations profilePicture");
    
    res.render("pages/home", {
        title: "FitSync - Your Fitness Journey Starts Here",
        featuredPlans: courses, // Use courses instead of static plans
        topTrainers
    });
}));

// About page
router.get("/about", (req, res) => {
    res.render("pages/about", {
        title: "About Us - FitSync"
    });
});

// Gallery page
router.get("/gallery", (req, res) => {
    res.render("pages/gallery", {
        title: "Gallery - FitSync"
    });
});

// Contact page
router.get("/contact", (req, res) => {
    res.render("pages/contact", {
        title: "Contact Us - FitSync"
    });
});

// Courses listing page
router.get("/courses", asyncHandler(async (req, res) => {
    try {
        // Get all courses
        const courses = await Course.find({ isActive: true });
        
        // Get trainers for each course
        const trainers = await User.find({
            role: "trainer",
            status: "active"
        })
        .populate('trainerCourses.course')
        .select("name email profilePicture bio specializations trainerCourses");
        
        // Create course specific trainer maps
        const courseTrainers = {};
        
        if (courses && Array.isArray(courses)) {
            courses.forEach(course => {
                if (course && course._id) {
                    courseTrainers[course._id.toString()] = trainers.filter(trainer => 
                        trainer && trainer.trainerCourses && 
                        Array.isArray(trainer.trainerCourses) &&
                        trainer.trainerCourses.some(tc => 
                            tc && tc.status === 'active' && 
                            tc.course && tc.course._id && 
                            tc.course._id.toString() === course._id.toString()
                        )
                    );
                }
            });
        }
        
        res.render("pages/courses", {
            title: "Fitness Courses - FitSync",
            courses: courses || [], // Pass courses instead of plans
            trainers: trainers || [],
            courseTrainers: courseTrainers || {},
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId,
            userRole: req.session.userRole
        });
    } catch (error) {
        console.error("Error loading courses page:", error);
        res.status(500).render("pages/error", {
            title: "Error - FitSync",
            message: "Failed to load courses. Please try again later.",
            statusCode: 500,
            stack: process.env.NODE_ENV === 'development' ? error.stack : null,
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId, 
            userRole: req.session.userRole
        });
    }
}));

// Add a route for /plans that redirects to /courses
router.get("/plans", asyncHandler(async (req, res) => {
    return res.redirect("/courses");
}));

// User weekly schedule page
router.get("/schedule", asyncHandler(async (req, res) => {
    try {
        // Require login
        if (!req.session.userId) {
            return res.redirect("/auth/login?returnTo=/schedule");
        }
        
        // Get the user
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect("/auth/login");
        }
        
        // Get weekly schedule
        const schedule = await user.getWeeklySchedule();
        
        res.render("pages/schedule", {
            title: "My Weekly Schedule - FitSync",
            schedule,
            isLoggedIn: true,
            userId: req.session.userId,
            userRole: req.session.userRole,
            userName: user.name
        });
    } catch (error) {
        console.error("Error loading schedule page:", error);
        res.status(500).render("pages/error", {
            title: "Error - FitSync",
            message: "Failed to load schedule. Please try again later.",
            statusCode: 500,
            stack: process.env.NODE_ENV === 'development' ? error.stack : null,
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId, 
            userRole: req.session.userRole
        });
    }
}));

// Trainers listing page
router.get("/trainers", asyncHandler(async (req, res) => {
    try {
        const { course } = req.query;
        
        // Get trainers based on course filter if provided
        let trainersQuery = {
            role: "trainer", 
            status: "active"
        };
        
        if (course) {
            trainersQuery["trainerCourses.course"] = course;
            trainersQuery["trainerCourses.status"] = "active";
        }
        
        let trainers = await User.find(trainersQuery)
            .select("name specializations profilePicture bio trainerCourses")
            .populate("trainerCourses.course", "name");
        
        // Get all courses for filters
        const courses = await Course.find({ isActive: true }).select("name");
        
        res.render("pages/trainers", {
            title: "Our Trainers - FitSync",
            trainers,
            courses,
            filters: { course },
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId,
            userRole: req.session.userRole
        });
    } catch (error) {
        console.error("Error loading trainers page:", error);
        res.status(500).render("pages/error", {
            title: "Error - FitSync",
            message: "Failed to load trainers. Please try again later.",
            statusCode: 500,
            stack: process.env.NODE_ENV === 'development' ? error.stack : null,
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId, 
            userRole: req.session.userRole
        });
    }
}));

// Marketplace page
router.get("/marketplace", asyncHandler(async (req, res) => {
    try {
        // Get all available products
        const products = await Product.find({ status: "available" });
        
        res.render("pages/marketplace", {
            title: "Marketplace - FitSync",
            products,
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId,
            userRole: req.session.userRole
        });
    } catch (error) {
        console.error("Error loading marketplace page:", error);
        res.status(500).render("pages/error", {
            title: "Error - FitSync",
            message: "Failed to load marketplace. Please try again later.",
            statusCode: 500,
            stack: process.env.NODE_ENV === 'development' ? error.stack : null,
            isLoggedIn: !!req.session.userId,
            userId: req.session.userId, 
            userRole: req.session.userRole
        });
    }
}));

// Cart page
router.get("/cart", isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.userId })
            .populate('items.product');
        res.render("cart", {
            title: "Shopping Cart - FitSync",
            user: req.session.user,
            cart
        });
    } catch (error) {
        console.error('Error fetching cart page:', error);
        res.status(500).render('error', { 
            message: 'Error loading cart page',
            user: req.session.user
        });
    }
});

export default router; 