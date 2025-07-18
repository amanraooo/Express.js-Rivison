const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.get('/admin-panel', authMiddleware, isAdmin, (req, res) => {
  res.json({
    message: "Welcome admin",
    user: req.user
  });
});
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the dashboard",
    user: req.user
  });
});

module.exports = router;
