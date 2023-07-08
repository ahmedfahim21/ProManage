const mongoose = require('mongoose');

const ExpensesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expense: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        format: "%Y-%m-%d",
        required: true,
    },
    category: {
        type: String,
    }
});

module.exports = mongoose.model('Expenses', ExpensesSchema);