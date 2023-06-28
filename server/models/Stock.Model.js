const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item_name:{
        type: String,
        required: true,
    },
    item_quantity:{
        type: Number,
        required: true,
    },
    item_price:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Stock', stockSchema)