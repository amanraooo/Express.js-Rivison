const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

//token generate helper func
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '15m', }
    )
    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d', }
    )

    return {accessToken,refreshToken};
}


exports.refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    // Refresh token ko verify karo
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // User ko DB se find karo
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Naya accessToken banao
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: 'Expired or invalid refresh token' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({ message: 'Signup successful', accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const { accessToken, refreshToken } = generateTokens(user._id);

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({ message: 'Login success', accessToken, refreshToken });
};

exports.logout = async (req, res) => {
const { refreshToken } = req.body;

if (!refreshToken) {
return res.status(400).json({ message: 'Refresh token required' });
}

try {
const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
const user = await User.findById(decoded.id);

if (!user) return res.status(404).json({ message: 'User not found' });  

// Remove refresh token  
user.refreshToken = '';  
await user.save();  

res.status(200).json({ message: 'Logout successful' });

} catch (err) {
res.status(403).json({ message: 'Invalid token' });
}
};