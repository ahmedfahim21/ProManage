const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/register', usersController.RegisterUser);

router.post('/login', usersController.LoginUser);

router.get('/me', usersController.GetMe);


module.exports = router;

