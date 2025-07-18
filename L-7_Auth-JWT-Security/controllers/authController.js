const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    const { name, email, password , role} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password , role});

    const token = jwt.sign({ id: user._id , role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ message: 'Signup successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id , role: user.role  }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
