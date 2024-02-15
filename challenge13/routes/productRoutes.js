const express = require('express');
const router = express.Router();
const modelController = require('../controller/productController');

router.get('/', modelController.getAllProducts);
router.post('/', modelController.createProduct);
router.get('/search', modelController.searchProducts);
router.get('/:id', modelController.getProductById);
router.put('/:id', modelController.updateProduct);
router.delete('/:id', modelController.deleteProduct);


module.exports = router;
