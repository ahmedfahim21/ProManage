const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
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
        // 2default: Date.now,
        required: true,
    },
    total_amount:{
        type: Number,
    }
})

module.exports = mongoose.model('Sales', salesSchema)