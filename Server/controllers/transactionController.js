const { Transaction, transactionValidationSchema} = require('../models/transactionModel');

// creer une transaction

const createTransaction = async (req, res) => {
    try {
        const { error } = transactionValidationSchema.validate(req.body);
        if (error) return res.status(400).json({error: error.details[0].message});
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).send(transaction);
        
    } catch (error) {
        res.status(500).json({error: error.message});
        }
        };
// recupere ttes les transactions

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// recupere une transaction

const getTransactionById = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({error: `transaction not found!!`})
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// modifier une transaction

const updateTransactionById = async (req, res) => {
    const {id} = req.params;
    try {
        const {error} = transactionValidationSchema.validate(req.body);
        if (error) return res.status(400).json({error: error.details[0].message});
        const upTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!upTransaction) {
            return res.status(404).json({error: `transaction not found!!`})
        }
        res.status(200).send(upTransaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// supprimer une transaction

const deleteTransactionById = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({error: `transaction not found!!`})
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
//supprimer ttes les transactions

const deleteAllTransactions = async (req, res) => {
    try {
        await Transaction.deleteMany();
        res.status(200).send({message: 'transactions deleted'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById,
    deleteAllTransactions
};