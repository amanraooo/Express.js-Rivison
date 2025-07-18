const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message:` Welcome to your dashboard, user ID: ${req.user.id}`,
  });
});

module.exports = router;