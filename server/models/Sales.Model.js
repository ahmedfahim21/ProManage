const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
    },
    sold_price:{
        type: Number,
        required: true,
    },
    sold_quantity:{
        type: Number,
        required: true,
    },
    sold_date:{
        type: String,
        format: "%Y-%m-%d",
        required: true,
    },
    total_amount:{
        type: Number,
    },
    total_profit:{
        type: Number,
    },

})

module.exports = mongoose.model('Sales', salesSchema)