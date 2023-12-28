const express = require('express');
const morgan = require('morgan');
const joi = require('joi');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { validationResult } = require('express-validator');
const api = require("./routes/api")
require('./config/database');




dotenv.config({ path: '.env' });



const app = express();

// Middlewares de ExpressJS
app.use(express.urlencoded()); // send data with Form URLencoded
app.use(express.json()); // send data with JSON
// Import and use express-validator like this:
app.use((req, res, next) => {
    req.validationErrors = validationResult;  // Add validationResult to req object
    next();
});
// app.use(express.static('public')); // Access to the file static
app.use(helmet()); // To Secure requestes HTTP
app.use(morgan('tiny')); // Status of the requestes HTTP and 'tiny' responsable for format msg
app.use(cookieParser());



//Routes
// app.use('/api/v1/account', accountRoute)+const accountRoute = require('./routes/accountRoute');

app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/auth', require('./routes/authRoute'));
// app.use('/api/v1/notification', require('./routes/notificationRoute'));
// app.use('/api/v1/transaction', require('./routes/transactionRoute'));

//app.use('/api/v1', api);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
