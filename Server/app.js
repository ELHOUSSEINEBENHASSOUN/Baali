const express = require('express');
const bodyParser = require('body-parser');
const session =require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
require('./config/database');




dotenv.config({ path: '.env' });



const app = express();

// Middlewares de ExpressJS
app.use(express.urlencoded()); // send data with Form URLencoded
app.use(express.json()); // send data with JSON
// app.use(express.static('public')); // Access to the file static
app.use(helmet()); // To Secure requestes HTTP
app.use(morgan('tiny')); // Status of the requestes HTTP and 'tiny' responsable for format msg
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json()); // Middleware de body parsing pour les données JSON
// Middleware de body parsing pour les données de formulaire
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/auth', require('./routes/authRoute'));
app.use('/api/v1/category', require('./routes/categoryRoute'));
app.use('/api/v1/offer', require('./routes/offerRoute'));
app.use('/api/v1/notification', require('./routes/notificationRoute'));
app.use('/api/v1/transaction', require('./routes/transactionRoute'));




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
