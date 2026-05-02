const express = require('express');

const { createProduct, getAllProducts, updateProduct,getSingleProduct,deleteProduct } = require('../controllers/productController');

const router = express.Router();

//products route
//let's add a route to create products
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getSingleProduct);
module.exports = router;