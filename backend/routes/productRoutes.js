const express= require('express');
const Product = require('../models/productModel.js');
const {protect,admin}=require('../middleware/authMiddleware.js')
const router = express.Router();

// CREATE
// CREATE PRODUCT
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = new Product({ name, price, description, category, image });
        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// READ ALL
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

module.exports=router;
