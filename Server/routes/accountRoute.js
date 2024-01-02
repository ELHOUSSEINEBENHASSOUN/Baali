const express = require('express');
const router = express.Router();

//const auth = require('./middleware/authMiddleware');
const { createAccount, getAllAccounts, getAccountById, deleteAccountById, deleteAllAccounts, updateAccountById } = require('../controllers/accountController');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');




//Route CRUD admin // AUth middlware qui verifie si l'utilisatuer est connecté //Is admin verifie si l'utilisateur est un admin

router.post('/addAcc', auth,isAdmin,createAccount);
router.get('/getAllAcc',auth,isAdmin, getAllAccounts);
router.get('/getAcc/:id',auth,isAdmin, getAccountById);

router.delete('/delAcc/:id',auth,isAdmin, deleteAccountById);
router.delete('/delAllAcc', auth,isAdmin, deleteAllAccounts);

router.put('/updateAcc/:id',auth,isAdmin, updateAccountById);

module.exports = router;