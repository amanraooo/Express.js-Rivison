let orders = [
  { id: 1, product: 'Laptop', quantity: 2 },
  { id: 2, product: 'Phone', quantity: 1 }
];

// GET all orders
exports.getAllOrders = (req, res) => {
  res.json(orders);
};

// GET order by ID
exports.getOrderById = (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
};

// POST new order
exports.createOrder = (req, res) => {
  const { product, quantity } = req.body;
  const newOrder = { id: orders.length + 1, product, quantity };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// PUT update order
exports.updateOrder = (req, res) => {
  const orderId = parseInt(req.params.id);
  const { product, quantity } = req.body;
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).send('Order not found');
  if (product) order.product = product;
  if (quantity) order.quantity = quantity;
  res.send(`Order ID ${orderId} updated`);
};

// DELETE order
exports.deleteOrder = (req, res) => {
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) return res.status(404).send('Order not found');
  orders.splice(index, 1);
  res.send(`Order ID ${orderId} deleted`);
};

//search orders
exports.searchOrders = (req,res)=>{
    const keyword = req.query.user;
    if (!keyword) return res.status(400).send('provide product name to search')
         const results = orders.filter(order => order.name.toLowerCase().includes(keyword.toLowerCase()));
  res.json(results);
}