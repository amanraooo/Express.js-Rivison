const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

router.get('/', productController.getAllProducts);
router.post('/', validateProduct, productController.createProduct);

module.exports = router;
