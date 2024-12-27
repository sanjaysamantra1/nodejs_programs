const mongoose = require('mongoose');

// Define RefreshToken Schema
const tokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '4m' }, // Automatically expire after 7 days
});
const RefreshTokenModel = mongoose.model('Token', tokenSchema);

module.exports = RefreshTokenModel;