const express = require('express');
const router = express.Router();

//const auth = require('./middleware/authMiddleware');
const { createAccount, getAllAccounts, getAccountById, deleteAccountById, deleteAllAccounts, updateAccountById } = require('../controllers/accountController');
const auth = require('../middleware/authMiddleware');
//routes
router.post('/addAcc', createAccount);
router.get('/getAllAcc',auth, getAllAccounts);
router.get('/getAcc/:id', getAccountById);

router.delete('/delAcc/:id', deleteAccountById);
router.delete('/delAllAcc', deleteAllAccounts);

router.put('/updateAcc/:id', updateAccountById);

module.exports = router;