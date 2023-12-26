const express = require('express');
const router = express.Router();

//const auth = require('./middleware/authMiddleware');
const { createAccount, getAllAccounts, getAccountById, deleteAccountById, deleteAllAccounts, updateAccountById } = require('../controllers/accountController');
const auth = require('../middleware/authMiddleware');
//routes
router.post('/addAcc', createAccount);
router.get('/getAllAcc',auth, getAllAccounts);
router.get('/getAcc/:id',auth, getAccountById);

router.delete('/delAcc/:id',auth, deleteAccountById);
router.delete('/delAllAcc', auth, deleteAllAccounts);

router.put('/updateAcc/:id',auth, updateAccountById);

module.exports = router;