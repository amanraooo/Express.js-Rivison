module.exports = (req, res, next) => {
  const { user, product, quantity, userEmail } = req.body;

  if (!user) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (!product) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  if (!quantity) {
    return res.status(400).json({ message: 'Quantity is required' });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  next();
};
