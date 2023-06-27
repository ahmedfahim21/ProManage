const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.post('/update_stock', stockController.UpdateStock);
router.get('/get_stock', stockController.GetAllStock);
router.get('/get_stock_by_id/:id', stockController.GetStockById);
router.patch('/update_stock_by_id/:id', stockController.UpdateStockById);
router.delete('/delete_stock_by_id/:id', stockController.DeleteStockById);

module.exports = router;

