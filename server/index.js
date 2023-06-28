const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const sales_route = require('./routes/sales_route');
const stock_route = require('./routes/stock_route');
const daily_sales_route = require('./routes/daily_sales_route');
const user_route = require('./routes/users_route');
require('dotenv').config();


const databaseURL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);
app.use(express.json());

mongoose.connect(databaseURL , { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connected to Database'));

app.use('/sales', sales_route);
app.use('/stock', stock_route);
app.use('/daily_sales', daily_sales_route);
app.use('/users', user_route);
