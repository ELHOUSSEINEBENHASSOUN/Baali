const express =require('express');
const router = express.Router();

const { createTransaction, getAllTransactions, getTransactionById, updateTransactionById, deleteTransactionById, deleteAllTransactions } = require('../controllers/transactionController');

router.post('/addTrans', createTransaction);
router.get('/getAll', getAllTransactions);
router.get('/getTrans/:id', getTransactionById);
router.put('/upTrans/:id', updateTransactionById);
router.delete('/delTrans/:id', deleteTransactionById);
router.delete('/delAll', deleteAllTransactions);

module.exports = router;