const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

router.get('/', userController.getAllUsers);
router.post('/', validateUser, userController.createUser);

module.exports = router;
