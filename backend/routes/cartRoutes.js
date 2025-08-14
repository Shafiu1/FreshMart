const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");

// 📌 Get cart for logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 Add product to cart
router.post("/", protect, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
        } else {
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 📌 Remove product from cart
router.delete("/:productId", protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
