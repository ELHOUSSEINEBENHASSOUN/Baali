const express = require('express');
const morgan = require('morgan');
const joi = require('joi');
const helmet = require('helmet');
const dotenv = require('dotenv');
require('./config/database');
var session = require('express-session')




dotenv.config({ path: '.env' });



const app = express();
app.use(session({
    secret: 'your_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// Middlewares de ExpressJS
app.use(express.urlencoded({ extended: true })); // send data with Form URLencoded
app.use(express.json()); // send data with JSON
// app.use(express.static('public')); // Access to the file static
app.use(helmet()); // To Secure requestes HTTP
app.use(morgan('tiny')); // Status of the requestes HTTP and 'tiny' responsable for format msg
//app.use(session({ secret: 'keyboardcat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));

//Routes
// app.use('/api/v1/account', accountRoute)+const accountRoute = require('./routes/accountRoute');

// app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/category', require('./routes/categoryRoute'));
app.use('/api/v1/offer', require('./routes/offerRoute'));
app.use('/api/v1/notification', require('./routes/notificationRoute'));
app.use('/api/v1/auth', require('./routes/AuthRoute'));
// app.use('/api/v1/transaction', require('./routes/transactionRoute'));



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
