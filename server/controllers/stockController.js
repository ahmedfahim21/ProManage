const Stock = require('../models/Stock.Model');
const User = require('../models/Users.Model');

// @desc   Update stock
// @route  POST /stock/update_stock
// @access Private
const UpdateStock = async (req,res)=>{
    const data = new Stock({
        item_name: req.body.item_name,
        item_quantity: req.body.item_quantity,
        item_price: req.body.item_price,
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

// @desc   Get all stock
// @route  GET /stock/get_stock
// @access Private
const GetAllStock = async (req,res)=>{
    try{
        const data = await Stock.find({ user: req.user.id });
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}


// @desc   Get stock by id
// @route  GET /stock/get_stock_by_id/:id
// @access Private
const GetStockById = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const itemOwner = await Stock.findById(id);

        if(user._id != itemOwner.user.toString()){
            return res.status(401).json({message: "Unauthorized"});
        }

        const data = await Stock.findById(req.params.id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Update stock by id
// @route  PATCH /stock/update_stock_by_id/:id
// @access Private
const UpdateStockById = async (req,res)=>{
    try{
        const id = req.params.id;
        const updated_data = req.body;

        const user = await User.findById(req.user.id);
        const itemOwner = await Stock.findById(id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(user._id != itemOwner.user.toString()){
            return res.status(401).json({message: "Unauthorized"});
        }
        

        const result = await Stock.findByIdAndUpdate(id, updated_data);
        res.status(200).send(result);

    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Delete stock by id
// @route  DELETE /stock/delete_stock_by_id/:id
// @access Private
const DeleteStockById = async (req,res)=>{
    try{
        const id = req.params.id;

        const user = await User.findById(req.user.id);
        const itemOwner = await Stock.findById(id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(user._id != itemOwner.user.toString()){
            return res.status(401).json({message: "Unauthorized"});
        }
        const result = await Stock.findByIdAndDelete(id);
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