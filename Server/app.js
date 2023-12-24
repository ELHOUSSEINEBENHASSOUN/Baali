const express = require('express');
const morgan= require('morgan');
const joi = require('joi');
const helmet = require('helmet');
const dotenv = require('dotenv');
require('./config/database');




dotenv.config({path: '.env'});



const app = express();

// Middlewares de ExpressJS
app.use(express.urlencoded()); // send data with Form URLencoded
app.use(express.json()); // send data with JSON
// app.use(express.static('public')); // Access to the file static
app.use(helmet()); // To Secure requestes HTTP
app.use(morgan('tiny')); // Status of the requestes HTTP and 'tiny' responsable for format msg


//Routes
// app.use('/api/v1/account', accountRoute)+const accountRoute = require('./routes/accountRoute');

// app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/notification', require('./routes/notificationRoute'));
app.use('/api/v1/transaction', require('./routes/transactionRoute'));




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
