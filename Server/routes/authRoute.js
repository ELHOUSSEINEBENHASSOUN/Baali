const express = require('express');
const router = express.Router();
const { login, requestPasswordReset, changePassword, register, logout } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/changePass/:id', authenticate, changePassword);
router.post('/passwordReset/:id', requestPasswordReset);



module.exports = router;