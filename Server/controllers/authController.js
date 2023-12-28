const bcrypt = require('bcrypt');
const { Account } = require('../models/accountModel');
const { generateToken, verifyToken } = require('../utils/jwt');


const register = async (req, res) => {
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const account = new Account({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedpassword,
        });
        await account.save();
        res.status(201).json({ message: 'User created successfully', user: { _id: account._id, fullname: account.fullname } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ message: 'Email or Password Invalid !' });
    }
    const account = await Account.findOne({ email: req.body.email });
    if (!account) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const isMatch = await bcrypt.compare(req.body.password, account.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = generateToken(account);

    res.cookie('authToken', token, { httpOnly: true });
    res.status(200).json({ token });
};


const logout = (req, res) => {
    // Clear the 'authToken' cookie
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logout successful' });
};


module.exports = {
    login,
    register,
    logout
};



// register
// Logout
// Login