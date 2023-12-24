const express = require('express');
const router = express.Router();

const { createAccount, getAllAccounts, getAccountById, deleteAccountById, updateAccountById } = require('../controllers/accountController');

//routes
router.post('/addAcc', createAccount);
router.get('/getAllAcc', getAllAccounts);
router.get('/getAcc/:id', getAccountById);
router.delete('/delAcc/:id', deleteAccountById);
router.put('/updateAcc/:id', updateAccountById);


module.exports = router;