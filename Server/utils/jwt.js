const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = account => {
    const payload = {
        id: account.id,
        fullname: account.fullname,
        email: account.email,
        role: account.role
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = token => {
    try{
    return jwt.verify(token, secretKey);
    }catch(error) {
        if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired')
        } else {
        throw new Error('Error verifying token')}
    }
};

module.exports = { generateToken, verifyToken };