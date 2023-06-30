const express = require('express');
const usersController = require('../controllers/usersController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', usersController.RegisterUser);

router.post('/login', usersController.LoginUser);

router.get('/me', protect, usersController.GetMe);

router.get('/logout', protect, usersController.LogoutUser);


module.exports = router;

