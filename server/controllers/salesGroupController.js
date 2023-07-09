const salesGroup = require('../models/SalesGroup.Model');
const Sales = require('../models/Sales.Model');

const calculate = async () => {
    await salesGroup.deleteMany({});
    const calculated_data = await Sales.aggregate([
        {
            $group: {
                _id: "$item_id",
                item_name: { $first: "$item_id.item_name" },
                total_sales: {
                    $sum: "$total_amount"
                },
                total_quantity: {
                    $sum: "$sold_quantity"
                },
                total_profit: {
                    $sum: "$total_profit"
                },
                user: { $first: "$user" }
            },
        },
        {
            $project: {
                    _id: 0,
                    item: '$_id',
                    item_name: 1,
                    total_sales: 1,
                    total_quantity: 1,
                    total_profit: 1,
                    user: 1
                },
        }
    ]);

    
    await salesGroup.insertMany(calculated_data);
}


// @desc    Get sales group
// @route   GET /sales/get_sales_group
// @access  Private
const GetSalesGrouped = async (req, res) => {
    await calculate();
    try {
        const sales_group = await salesGroup.find({user: req.user.id}).populate('item');
        res.json(sales_group);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    GetSalesGrouped
}