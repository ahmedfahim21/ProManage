const Sales = require('../models/Sales.Model');
const User = require('../models/Users.Model');


// @desc   Update sales
// @route  POST /sales/update_sales
// @access Private
const UpdateSales = async (req,res)=>{
    const data = new Sales({
        item_id: req.body.item_id,
        sold_price: req.body.sold_price,
        sold_quantity: req.body.sold_quantity,
        sold_date: req.body.sold_date,
        total_amount: req.body.total_amount,
        total_profit: req.body.total_profit,
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

// @desc   Get all sales
// @route  GET /sales/get_sales
// @access Private
const GetAllSales = async (req,res)=>{
    try{
        const data = await Sales.find({user: req.user.id}).populate('item_id');
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Get sales by id
// @route  GET /sales/get_sales_by_id/:id
// @access Private
const GetSalesById = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const Owner = await Sales.findById(id);

        if(user._id != Owner.user.toString()){
            return res.status(401).json({message: "Unauthorized"});
        }

        const data = await Sales.findById(id).populate('item_id');
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Delete sales by id
// @route  DELETE /sales/delete_sales_by_id/:id
// @access Private
const DeleteSalesById = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const Owner = await Sales.findById(id);

        if(user._id != Owner.user.toString()){
            return res.status(401).json({message: "Unauthorized"});
        }

        const result = await Sales.findByIdAndDelete(id);
        res.status(200).send(`Document with name ${result.item_name} deleted`);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

module.exports = {
    UpdateSales,
    GetAllSales,
    GetSalesById,
    DeleteSalesById
}
