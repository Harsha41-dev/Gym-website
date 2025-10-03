import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    addToCart,
    getCart,
    removeFromCart,
    updateCartItemQuantity,
    checkout
} from "../controllers/marketplace.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import Cart from "../models/cart.model.js";

const router = Router();

// Public routes
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

// Protected routes (require login)
router.post("/cart", isAuthenticated, addToCart);
router.get("/cart", isAuthenticated, getCart);
router.delete("/cart/:productId", isAuthenticated, removeFromCart);
router.patch("/cart/:productId/quantity", isAuthenticated, updateCartItemQuantity);
router.post("/checkout", isAuthenticated, checkout);

// Cart page route
router.get("/cart-page", isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.session.userId })
            .populate('items.product');
        res.render('cart', { cart });
    } catch (error) {
        console.error('Error fetching cart page:', error);
        res.status(500).render('error', { message: 'Error loading cart page' });
    }
});

export default router; 