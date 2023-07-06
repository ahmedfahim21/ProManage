const dailySales = require('../models/DailySales.Model');
const Sales = require('../models/Sales.Model');

const calculate = async () => {
    await dailySales.deleteMany({});
    const calculated_data = await Sales.aggregate([
        {
            $group: {
                _id: "$sold_date",
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
                  date: '$_id',
                  total_sales: 1,
                  total_quantity: 1,
                  total_profit: 1,
                  user: 1
                },
        }
    ]);

    
    await dailySales.insertMany(calculated_data);
}


// @desc    Get daily sales
// @route   GET /daily_sales/get_daily_sales
// @access  Private
const GetDailySales = async (req, res) => {
    await calculate();
    try {
        const daily_sales = await dailySales.find({user: req.user.id});
        res.json(daily_sales);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    GetDailySales
}