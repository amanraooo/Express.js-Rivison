const Order = require('../models/orderModel');

exports.createOrder = async (req, res, next) => {
  try {
    const { user, product, quantity, userEmail } = req.body;
    const newOrder = await Order.create({ user, product, quantity, userEmail });
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('product');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
