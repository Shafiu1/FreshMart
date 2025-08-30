const express = require("express");
const Cart = require("../models/cartModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get current user's cart
router.get("/", protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Add product to cart
router.post("/", protect, async (req, res) => {
    const { product, name, price, image, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        // Check if product already in cart
        const existItem = cart.items.find((x) => x.product.toString() === product);
        if (existItem) {
            existItem.quantity += quantity || 1;
        } else {
            cart.items.push({ product, name, price, image, quantity: quantity || 1 });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update quantity of a product in cart
router.put("/:id", protect, async (req, res) => {
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find((x) => x._id.toString() === req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity = quantity; // update quantity
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove product from cart
router.delete("/:id", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter((x) => x._id.toString() !== req.params.id);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Clear cart
router.delete("/", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
