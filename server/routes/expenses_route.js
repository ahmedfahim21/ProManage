const express = require('express');
const expensesController = require('../controllers/expensesController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add_expense', protect, expensesController.AddExpense);
router.get('/get_expenses', protect, expensesController.GetAllExpenses);
router.delete('/delete_expense_by_id/:id', protect, expensesController.DeleteExpenseById);

module.exports = router;