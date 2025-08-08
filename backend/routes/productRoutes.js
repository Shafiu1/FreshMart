const express= require('express');
const Product = require('../models/productModel.js');

const router = express.Router();

// CREATE
// CREATE PRODUCT
router.post('/', async (req, res) => {
    try {
        const { name, price, category, image, description } = req.body;

        const product = new Product({
            name,
            price,
            category,
            image,
            description
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
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
