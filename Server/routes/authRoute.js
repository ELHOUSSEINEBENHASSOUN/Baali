const express = require('express');
const router = express.Router();
const { login, forgotPassword, changePassword, resetPasswordRoute, register, logout } = require('../controllers/authController');
const {authenticate, sendEmail, limiter} = require('../middleware/authMiddleware');

router.post('/reset/:token',limiter, resetPasswordRoute);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/changePass/:id', authenticate, changePassword);
router.post('/forgot-password/:id', sendEmail, forgotPassword);



module.exports = router;