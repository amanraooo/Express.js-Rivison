const Order = require('../models/orderModel');

// get all orders (GET)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        res.status(500).send('server error')
    }
}

//get order by id 
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send('order not found')
        res.json(order)
    } catch (err) {
        res.status(500).send('server error')
    }
}

//create an order (POST)
exports.createOrder = async (req, res) => {
    try {
        const { productName, quantity, totalPrice } = req.body
        const newOrder = new Order({ productName, quantity, totalPrice });
        await newOrder.save();
        res.status(201).send(newOrder)
    } catch (err) {
        res.status(500).send('server error')
    }
}

//update an order (PUT)
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        const { productName, quantity, totalPrice } = req.body
        if (!order) return res.status(404).send('Order not found');

        if (productName) order.productName = productName;
        if (quantity) order.quantity = quantity;
        if (totalPrice) order.totalPrice = totalPrice;

        await order.save();
        res.json({ message: 'order updated', order })
    } catch (err) {
        res.status(500).send('server error')
    }
}

// delete order (DELETE)
exports.deleteOrder = async (req, res) => {
    try {
        const order = Order.findByIdAndDelete(req.order.id);
        if (!order) return res.status(404).send('Order not found');
        res.send(`order with ID ${req.order.id} is deleted`)
    } catch (err) {
        res.status(500).send('server error')
    }
}

//search orders 
exports.searchOrder = async (Req, res) => {
    try {
        const keyword = req.query.productName
        if (!keyword) return res.status(400).send('Please provide a productName to search');
        const result = await Order.find({
            productName: { $regex: keyword, $options: 'i' } //for case sensitive search
        })
        res.json(result);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};