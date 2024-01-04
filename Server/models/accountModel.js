const mongoose = require('mongoose');
const crypto = require('crypto');
const Joi = require('joi');
const findOrCreate = require('mongoose-findorcreate');



// 1- Définition du schéma
const AccountSchema = new mongoose.Schema({


    email: { type: String, required: false, unique: false, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    /*// _id: { type: String, default: () => crypto.randomUUID() },

    fullname: { type: String, required: false, trim: true },

    email: { type: String, required: false, unique: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },

    password: { type: String, required: false },

    phoneNumber: { type: String, required: false, trim: true },

    address: { type: Array, required: false },

    isAdmin: { type: Boolean, required: false },

    createdAt: { type: Date, default: Date.now },

    lastLogin: { type: Date, default: null },

    wishlist: { type: Array, required: false },

    resetPasswordToken: { type: String, default: null },

    confirmationToken : {type: String},

    confirmed : {type:Boolean , default: false},*/

    provider: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    emails: [
        {  
            value: String,
            default:"mounir@mounir.mounir",
            type: String
        }
    ],
    photos: [
        {
            value: String
        }
    ],


    //resetPasswordExpires: { type: Date, default: null }

}, { versionKey: false });

// 2- Définition du schéma de validation avec Joi
const accountValidationSchema = Joi.object({
    fullname: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    address: Joi.array().items(Joi.string()),
    phoneNumber: Joi.string(),
    isAdmin: Joi.boolean(),
    createdAt: Joi.date().iso().max('now'),
    lastLogin: Joi.date().allow(null),
    wishlist: Joi.array().items(Joi.string()),
    resetPasswordToken: Joi.string().allow(null),
    resetPasswordExpires: Joi.date().iso().max('now').allow(null),
});

AccountSchema.plugin(findOrCreate);
// 3- Définition du modèle de account
const Account = mongoose.model('Account', AccountSchema);

// 4- Exportation du modèle de account et du schéma de validation
module.exports = {
    Account,
    accountValidationSchema
};