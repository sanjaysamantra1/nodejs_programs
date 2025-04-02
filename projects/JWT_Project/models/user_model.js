const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    refreshToken: { type: String },
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
