const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

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

app.use('/api', routes);
