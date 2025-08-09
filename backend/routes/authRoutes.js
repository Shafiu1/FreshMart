const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password,role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,//default role
    });

    // Create token
    const token = jwt.sign({ id: user._id,role:user.role}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role:user.role,
        },
    });
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    // Send token and user wrapped inside 'user' key
    return res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role:user.role,
        },
    });
});

module.exports = router;
