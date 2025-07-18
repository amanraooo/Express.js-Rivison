module.exports = (req, res, next) => {
  const { name, price } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Product name is required' });
  }

  if (price === undefined) {
    return res.status(400).json({ message: 'Product price is required' });
  }

  next();
};
