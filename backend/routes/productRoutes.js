const express= require('express');
const Product = require('../models/productModel.js');

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    const saved = await product.save();
    res.json(saved);
});

// READ ALL
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
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
