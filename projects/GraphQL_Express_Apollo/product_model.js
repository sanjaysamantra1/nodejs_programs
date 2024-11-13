const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    rating: [Number],
})
const productModel = mongoose.model('products', productSchema);
module.exports = productModel;