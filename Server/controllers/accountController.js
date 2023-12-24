const { Account, accountValidationSchema } = require('../models/accountModel');


// recupere toutes les accounts
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).send(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// creer un account
const createAccount = async (req, res) => {
    try {
        // Validate the data
        const { error } = accountValidationSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });
        // Save the account
        const account = new Account(req.body);
        await account.save();

        res.status(201).send(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// recupere un account by id
const getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).send(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// supprimer un account by id
const deleteAccountById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).send(deletedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update un account 
const updateAccountById = async (req, res) => {
    const { id } = req.params;

    try {
        const { error, value } = accountValidationSchema.validate(req.body);
        if (error) {
            return res.status(404).json({ error: error.details[0].message });
        }

        const upAccount = await Account.findByIdAndUpdate(id, value, { new: true });
        if (!upAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }

        res.status(200).send(upAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    deleteAccountById,
    updateAccountById
};
