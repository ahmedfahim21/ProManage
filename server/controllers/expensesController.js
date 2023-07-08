const Expenses = require('../models/Expenses.Model');

// @desc   Add expense
// @route  POST /expenses/add_expense
// @access Private
const AddExpense = async (req,res)=>{
    const data = new Expenses({
        expense: req.body.expense,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category,
        user: req.user.id
    })
    try{
        const savedData = await data.save();
        res.status(200).json(savedData);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Get all expenses
//@route   GET /expenses/get_expenses
//@access  Private
const GetAllExpenses = async (req,res)=>{
    try{
        const data = await Expenses.find({ user: req.user.id });
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Delete expense by id
// @route  DELETE /expenses/delete_expense_by_id/:id
// @access Private
const DeleteExpenseById = async (req,res)=>{
    try{
        const id = req.params.id;

        const itemOwner = await Expenses.findById(id);
        
        if(req.user.id != itemOwner.user.toString()){
            return res.status(401).json({message: "Unauthorized"});
        }

        const data = await Expenses.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

module.exports = {
    AddExpense,
    GetAllExpenses,
    DeleteExpenseById
}