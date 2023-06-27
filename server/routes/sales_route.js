const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/update_sales', salesController.UpdateSales);

router.get('/get_sales', salesController.GetAllSales);

router.get('/get_sales_by_id/:id', salesController.GetSalesById);

router.delete('/delete_sales_by_id/:id', salesController.DeleteSalesById);

module.exports = router;