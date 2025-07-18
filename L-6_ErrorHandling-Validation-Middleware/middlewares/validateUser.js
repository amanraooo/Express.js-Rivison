module.exports = (req, res, next) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  next();
};
