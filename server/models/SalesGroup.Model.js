const mongoose = require('mongoose');

const salesGroupSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true,
    },
    total_sales:{
        type: Number,
        required: true
    },
    total_quantity:{
        type: Number,
        required: true
    },
    total_profit:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('SalesGroup', salesGroupSchema)