const mongoose = require('mongoose');
const crypto = require('crypto');
const Joi = require('joi');



// 1- Définition du schéma
const AccountSchema = new mongoose.Schema({

    // _id: { type: String, default: () => crypto.randomUUID() },

    fullname: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },

    password: { type: String, required: true },

    phoneNumber: { type: String, required: true, trim: true },

    address: { type: Array, required: true },

    isAdmin: { type: Boolean, required: true },

    createdAt: { type: Date, default: Date.now },

    lastLogin: { type: Date, default: null },

    wishlist: { type: Array, required: false },

    resetPasswordToken: { type: String, default: null },

    confirmationToken : {type: String},

    resetPasswordExpires: { type: Date, default: null }

}, { versionKey: false });

// 2- Définition du schéma de validation avec Joi
const accountValidationSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.array().items(Joi.string()).required(),
    phoneNumber: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    createdAt: Joi.date().iso().max('now'),
    lastLogin: Joi.date().allow(null),
    wishlist: Joi.array().items(Joi.string()),
    resetPasswordToken: Joi.string().allow(null),
    resetPasswordExpires: Joi.date().iso().max('now').allow(null),
});


// 3- Définition du modèle de account
const Account = mongoose.model('Account', AccountSchema);

// 4- Exportation du modèle de account et du schéma de validation
module.exports = {
    Account,
    accountValidationSchema
};