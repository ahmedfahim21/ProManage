const sales_route = require('./sales_route');
const stock_route = require('./stock_route');
const daily_sales_route = require('./daily_sales_route');
const user_route = require('./users_route');
const express = require('express');

const app = express();

app.use('/sales', sales_route);
app.use('/stock', stock_route);
app.use('/daily_sales', daily_sales_route);
app.use('/users', user_route);

module.exports = app;
