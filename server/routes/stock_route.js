const express = require('express');
const stockController = require('../controllers/stockController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/update_stock', protect, stockController.UpdateStock);
router.get('/get_stock', protect, stockController.GetAllStock);
router.get('/get_stock_by_id/:id', protect, stockController.GetStockById);
router.patch('/update_stock_by_id/:id', protect, stockController.UpdateStockById);
router.delete('/delete_stock_by_id/:id', protect, stockController.DeleteStockById);

module.exports = router;

