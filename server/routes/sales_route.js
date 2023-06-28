const express = require('express');
const salesController = require('../controllers/salesController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/update_sales', protect, salesController.UpdateSales);

router.get('/get_sales', protect, salesController.GetAllSales);

router.get('/get_sales_by_id/:id', protect, salesController.GetSalesById);

router.delete('/delete_sales_by_id/:id', protect, salesController.DeleteSalesById);

module.exports = router;