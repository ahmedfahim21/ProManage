const express = require('express');
const dailySalesController = require('../controllers/dailySalesController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/get_daily_sales', protect, dailySalesController.GetDailySales);

module.exports = router;