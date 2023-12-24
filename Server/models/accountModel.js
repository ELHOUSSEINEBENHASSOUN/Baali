const mongoose = require('mongoose');
const crypto = require('crypto');

const AccountSchema = new mongoose.Schema({

    // _id: { type: String, default: () => crypto.randomUUID() },

    fullname: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },

    password: { type: String, required: true },

    phoneNumber: { type: String, required: true, unique: true, trim: true },

    address: { type: Array, required: true },

    isAdmin: { type: Boolean, required: true },

    createdAt: { type: Date, default: Date.now },

    lastLogin: { type: Date, default: null },

    wishlist: { type: Array, required: false },

    resetPasswordToken: { type: String, required: false },

    resetPasswordExpires: { type: Date, required: false }

})

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;