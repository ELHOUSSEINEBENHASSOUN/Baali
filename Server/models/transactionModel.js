const mongoose=require('mongoose');
const Joi = require('joi');

// Définition de schéma

const transactionSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { versionKey: false});

// schéma de validation 

const transactionValidationSchema = Joi.object({
    orderId: Joi.string().required(),
    accountId: Joi.string().required(),
    amount: Joi.number().required(),
    transactionDate: Joi.date().iso().max('now'),
    paymentMethod: Joi.string().required(),
    status: Joi.string().required()
});

// modèle de transaction

const Transaction = mongoose.model('Transaction', transactionSchema);

// exportation du modèle de transaction et du schéma de validation

module.exports = {
    Transaction,
    transactionValidationSchema
};