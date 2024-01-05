const mongoose = require('mongoose');
const Joi = require('joi');
const { productSchema } = require('../models/productModel');

// 1- Définition du schéma
const AccountSchema = new mongoose.Schema({

    // _id: { type: String, default: () => crypto.randomUUID() },

    fullname: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    password: { type: String, required: true },

    phoneNumber: { type: String, trim: true },

    address: { type: Array, default: [] },

    isAdmin: { type: Boolean, required: true, default: false },

    lastLogin: { type: Date, default: null },

    wishlist: { type: Array, default: [] },

    resetPasswordToken: { type: String },

    resetPasswordExpires: { type: Date },

    role: { type: String, enum: ['Admin', 'Manager', 'Customer'], default: 'Customer' },


    isActive: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },

    confirmationToken : {type: String},

    confirmed : {type:Boolean , default: false},
    resetPasswordExpires: { type: Date, default: null }

},
    { timestamps: true, versionKey: false }
);

// 2- Définition du schéma de validation avec Joi
const accountSchema = Joi.object({
    fullname: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().trim(),
    address: Joi.array().items(Joi.string()).default([]),
    isAdmin: Joi.boolean().required().default(false),
    lastLogin: Joi.date().default(null),
    wishlist: Joi.array().items(Joi.string()).default([]),
    resetPasswordToken: Joi.string(),
    resetPasswordExpires: Joi.date(),
    role: Joi.string().valid('Admin', 'Manager', 'Customer'),
    isActive: Joi.boolean().default(false),
    resetPasswordToken: Joi.string().allow(null),
    resetPasswordExpires: Joi.date().iso().max('now').allow(null),
});


// 2- Définition du modèle de account
const Account = mongoose.model('Account', AccountSchema);

// 3- Exportation du modèle de account et du schéma de validation
module.exports = {
    Account,
    accountSchema
};