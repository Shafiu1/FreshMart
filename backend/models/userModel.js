const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-mail is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // only these two roles allowed
        default: 'user' // new users will be normal users by default
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
