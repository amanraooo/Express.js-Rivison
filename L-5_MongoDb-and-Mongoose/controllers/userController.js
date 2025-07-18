const User = require('../models/userModel');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// POST create user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(`User ID ${req.params.id} deleted`);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

//search user 
exports.searchUser = async (Req, res) => {
    try {
        const keyword = req.query.name
        if (!keyword) return res.status(400).send('Please provide a name to search');
        const result = await User.find({
            name: { $regex: keyword, $options: 'i' } //for case sensitive search
        })
        res.json(result);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};