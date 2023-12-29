const express = require('express');
const router = express.Router();

const { createAccount, getAllAccounts, getAccountById, deleteAccountById, deleteAllAccounts, updateAccountById } = require('../controllers/accountController');
const { accountValidator } = require('../middleware/accountMiddleware');
const { authenticate, isAdmin, isManager } = require('../middleware/authMiddleware');

//routes
router.post('/addAcc', accountValidator, createAccount);
router.get('/getAllAcc', getAllAccounts);
router.get('/getAcc/:id', getAccountById);

router.delete('/delAcc/:id', deleteAccountById);
router.delete('/delAllAcc', deleteAllAccounts);

router.put('/updateAcc/:id', updateAccountById);

module.exports = router;