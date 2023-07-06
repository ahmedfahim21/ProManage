const mongoose = require('mongoose');

const dailySalesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date:{
        type: Date,
        required: true,
        unique: true
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

module.exports = mongoose.model('DailySales', dailySalesSchema)