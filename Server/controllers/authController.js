const bcrypt = require('bcrypt');
const { Account } = require('../models/accountModel');
const { generateToken, verifyToken } = require('../utils/jwt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
    try {
    // Use Ethereal SMTP server details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host:"smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    
    // Email options
    const mailOptions = {
      from:{
        name: 'DRESSING ROOM BAALI',
        address: process.env.USER
      },
      to: 'a.jrhaidar@elbilia.ma',
      subject: "Hello ✔",
      text,
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

const register = async (req, res) => {
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const account = new Account({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedpassword,
        });
        await account.save();
        // Send mail: welcome to Baali
        const subject = 'Welcome to your Baali site';
        const text = `Happy Shopping! Welcome to the Dressing Room of Baali. Please verify your email by clicking on the following link: http://localhost:3000/api/v1/auth/register`;

        await sendEmail(account.email, subject, text);

        res.status(201).json({ message: 'User created successfully', user: { _id: account._id, fullname: account.fullname } });
    } catch (error) {
        console.error('Error during registration: ', error.message)
        res.status(500).json({ message: 'Internal Server Error' });
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

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const account = await Account.findById(req.params.id).select('+password');
        const isValidOldPassowrd = await bcrypt.compare(oldPassword, account.password);
        if (!isValidOldPassowrd) {
            return res.status(400).json({ field: 'oldPassword', message: "Invalid Old Password" })
            } else {
                account.password = await bcrypt.hash(newPassword, 10);
                await account.save();
                }
        const token = generateToken(account);
        res.cookie('authToken', token, { httpOnly: true }).send({ message: 'Password changed successfully!' });

        
    } catch (error) {
        console.log("Change password error : ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const requestPasswordReset= async (req, res) => {
    try {
        const {email} = req.body;
        const account = await Account.findOne({email});
        if(!account){
            return res.status(404).json({message:"Account not found!"})
            }
            // Générer un token temporaire pour la réinitialisation
            const resetToken = generateToken(account);
            // Envoyer le lien de réinitialisation par mail
            const url = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
            // Envoyer le lien par email
            sendEmail(email,url,"Réinitialiser votre mot de passe");
            res.status(200).json({message:'Email sent!'});
    } catch (error) {
        console.log("Request password reset error : ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const logout = (req, res) => {
    // Clear the 'authToken' cookie
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logout successful' });
};


module.exports = {
    login,
    register,
    requestPasswordReset,
    changePassword,
    logout
};



// register
// Logout
// Login