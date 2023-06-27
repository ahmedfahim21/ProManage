const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
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