const Model = require('../models/Sales.Model');



// @desc   Update sales
// @route  POST /sales/update_sales
// @access Public
const UpdateSales = async (req,res)=>{
    const data = new Model({
        item_id: req.body.item_id,
        sold_price: req.body.sold_price,
        sold_quantity: req.body.sold_quantity,
        sold_date: req.body.sold_date,
        total_amount: req.body.sold_price*req.body.sold_quantity
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
// @access Public
const GetAllSales = async (req,res)=>{
    try{
        const data = await Model.find().populate('item_id');
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Get sales by id
// @route  GET /sales/get_sales_by_id/:id
// @access Public
const GetSalesById = async (req,res)=>{
    try{
        const data = await Model.findById(req.params.id).populate('item_id');
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

// @desc   Delete sales by id
// @route  DELETE /sales/delete_sales_by_id/:id
// @access Public
const DeleteSalesById = async (req,res)=>{
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
    UpdateSales,
    GetAllSales,
    GetSalesById,
    DeleteSalesById
}
