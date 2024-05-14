const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: String,
    productName: String,
    price: Number,
    colors: Object,
    imgPath: String,
})

const ProductModel= mongoose.model('MyProducts', productSchema);
module.exports = ProductModel;