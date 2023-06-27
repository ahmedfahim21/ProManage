const Model = require('../models/Stock.Model');

// @desc   Update stock
// @route  POST /stock/update_stock
// @access Public
const UpdateStock = async (req,res)=>{
    const data = new Model({
        item_name: req.body.item_name,
        item_quantity: req.body.item_quantity,
        item_price: req.body.item_price
    })
    try{
        const savedData = await data.save();
        res.status(200).json(savedData);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Get all stock
// @route  GET /stock/get_stock
// @access Public
const GetAllStock = async (req,res)=>{
    try{
        const data = await Model.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}


// @desc   Get stock by id
// @route  GET /stock/get_stock_by_id/:id
// @access Public
const GetStockById = async (req,res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Update stock by id
// @route  PATCH /stock/update_stock_by_id/:id
// @access Public
const UpdateStockById = async (req,res)=>{
    try{
        const id = req.params.id;
        const updated_data = req.body;
        const options = {new: true};

        const result = await Model.findByIdAndUpdate(id, updated_data, options);
        res.status(200).send(result);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Delete stock by id
// @route  DELETE /stock/delete_stock_by_id/:id
// @access Public
const DeleteStockById = async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await Model.findByIdAndDelete(id);
        res.status(200).send(`Document with name ${result.item_name} deleted`);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

module.exports = {
    UpdateStock,
    GetAllStock,
    GetStockById,
    UpdateStockById,
    DeleteStockById
}