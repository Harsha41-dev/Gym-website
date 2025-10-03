import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ status: "available" });
    
    return res.status(200).json(
        new ApiResponse(200, products, "Products fetched successfully")
    );
});

// Get product by ID
export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, product, "Product fetched successfully")
    );
});

// Add to cart (for logged-in users)
export const addToCart = asyncHandler(async (req, res) => {
    // Check if user is logged in
    if (!req.session.userId) {
        throw new ApiError(401, "Please login to add items to cart");
    }

    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    
    // Check if product is in stock
    if (product.stock <= 0) {
        throw new ApiError(400, "Product is out of stock");
    }
    
    // Find or create user's cart
    let cart = await Cart.findOne({ user: req.session.userId });
    if (!cart) {
        cart = new Cart({ user: req.session.userId, items: [] });
    }
    
    // Check if product is already in cart
    const existingItem = cart.items.find(item => 
        item.product.toString() === productId
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            product: productId,
            quantity: 1,
            price: product.price
        });
    }
    
    // Save cart
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product');
    
    return res.status(200).json(
        new ApiResponse(200, cart, "Product added to cart")
    );
});

// Get cart
export const getCart = asyncHandler(async (req, res) => {
    // Check if user is logged in
    if (!req.session.userId) {
        throw new ApiError(401, "Please login to view cart");
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.session.userId })
        .populate('items.product');
    
    if (!cart) {
        return res.status(200).json(
            new ApiResponse(200, { items: [], totalAmount: 0 }, "Cart is empty")
        );
    }
    
    return res.status(200).json(
        new ApiResponse(200, cart, "Cart fetched successfully")
    );
});

// Remove from cart
export const removeFromCart = asyncHandler(async (req, res) => {
    // Check if user is logged in
    if (!req.session.userId) {
        throw new ApiError(401, "Please login to modify cart");
    }

    const { productId } = req.params;
    
    // Find user's cart
    const cart = await Cart.findOne({ user: req.session.userId });
    if (!cart) {
        throw new ApiError(400, "Cart is empty");
    }
    
    // Remove item from cart
    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );
    
    // Save cart
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product');
    
    return res.status(200).json(
        new ApiResponse(200, cart, "Product removed from cart")
    );
});

// Update cart item quantity
export const updateCartItemQuantity = asyncHandler(async (req, res) => {
    // Check if user is logged in
    if (!req.session.userId) {
        throw new ApiError(401, "Please login to modify cart");
    }

    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 1) {
        throw new ApiError(400, "Quantity must be at least 1");
    }
    
    // Find user's cart
    const cart = await Cart.findOne({ user: req.session.userId });
    if (!cart) {
        throw new ApiError(400, "Cart is empty");
    }
    
    // Find item in cart
    const cartItem = cart.items.find(
        item => item.product.toString() === productId
    );
    
    if (!cartItem) {
        throw new ApiError(404, "Item not found in cart");
    }
    
    // Check product stock
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
        throw new ApiError(400, "Not enough stock available");
    }
    
    // Update quantity
    cartItem.quantity = quantity;
    
    // Save cart
    await cart.save();
    
    // Populate product details
    await cart.populate('items.product');
    
    return res.status(200).json(
        new ApiResponse(200, cart, "Cart updated successfully")
    );
});

// Checkout (simplified version)
export const checkout = asyncHandler(async (req, res) => {
    // Check if user is logged in
    if (!req.session.userId) {
        throw new ApiError(401, "Please login to checkout");
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.session.userId })
        .populate('items.product');
    
    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }
    
    // Here you would typically:
    // 1. Process payment
    // 2. Update product stock
    // 3. Create order
    // 4. Clear cart
    
    // For now, we'll just clear the cart
    cart.items = [];
    await cart.save();
    
    return res.status(200).json(
        new ApiResponse(200, null, "Order placed successfully")
    );
});