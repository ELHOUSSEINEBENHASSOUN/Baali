const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerceDB';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log(`Connected to ${dbURI}`);
});
mongoose.connection.on('error', function (err) {
    console.log(`Error connecting to ${dbURI}: ${err}`);
});
mongoose.connection.on('disconnected', function () {
    console.log(`Disconnected from ${dbURI}`);
});