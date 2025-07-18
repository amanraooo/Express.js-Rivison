const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const validateOrder = require('../middlewares/validateOrder');

router.get('/', orderController.getAllOrders);
router.post('/', validateOrder, orderController.createOrder);

module.exports = router;
