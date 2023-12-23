const express = require('express');
require('./config/database');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const Joi = require('joi');
const app = express();


// Middlewares de ExpressJS
app.use(express.json()); // send data with JSON
app.use(express.urlencoded()); // send data with Form URLencoded
app.use(express.static('public')); // Access to the file static
app.use(helmet()); // To Secure requestes HTTP
app.use(morgan('tiny')); // Status of the requestes HTTP and 'tiny' responsable for format msg
dotenv.config({ path: '.env' }) // Get value PORT from file .env


// export SUPPRESS_NO_CONFIG_WARNING = 1
// Pour créer un port environment Tapez la commande : " export PORT=5000 "
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenning to the port ${port} ...`));