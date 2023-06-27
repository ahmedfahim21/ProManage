const express = require('express');
const dailySalesController = require('../controllers/dailySalesController');

const router = express.Router();

router.get('/get_daily_sales', dailySalesController.GetDailySales);

module.exports = router;