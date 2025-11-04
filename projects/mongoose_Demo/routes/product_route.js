const express = require('express');
const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/Product_controller');
const productRouter = express.Router();

productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProductById)
productRouter.post('/', addProduct)
productRouter.patch('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter;
