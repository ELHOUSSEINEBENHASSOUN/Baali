const mongoose = require('mongoose');
const { productSchema } = require('../models/accountModel');

// 1- Définition du schéma
const AccountSchema = new mongoose.Schema({

    // _id: { type: String, default: () => crypto.randomUUID() },

    fullname: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    password: { type: String, required: true },

    phoneNumber: { type: String, trim: true },

    address: { type: [String], default: [] },

    isAdmin: { type: Boolean, required: true, default: false },

    lastLogin: { type: Date, default: null },

    wishlist: { type: [productSchema], default: [] },

    resetPasswordToken: { type: String },

    resetPasswordExpires: { type: Date },

    role: { type: String, enum: ['Admin', 'Manager', 'Customer'], default: 'Customer' },

    isActive: { type: Boolean, default: false }

},
    { timestamps: true, versionKey: false }
);


// 2- Définition du modèle de account
const Account = mongoose.model('Account', AccountSchema);

// 3- Exportation du modèle de account et du schéma de validation
module.exports = {
    Account
};