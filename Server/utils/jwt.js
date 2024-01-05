const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = account => {
    try {
        const payload = {
        id: account.id,
        fullname: account.fullname,
        email: account.email,
        role: account.role
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
    }catch (error) {
        console.log("Error in generating token", error);
        throw new Error ('Error in generating token ');
    }
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