const mongoose = require('mongoose');
const crypto = require('crypto');

const AccountSchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => crypto.randomUUID(),
    },


    fullname: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Use a regular expression for basic email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address'
        }
    },


    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },


    //address: { type: Array, required: false },
    address: [{
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    }],


    isAdmin: {
        type: Boolean,
        required: true
    },


    createdAt: {
        type: Date,
        default: Date.now
    },


    lastLogin: {
        type: Date,
        default: null
    },


    wishlist: {
        type: Array,
        required: false
    },


    resetPasswordToken: {
        type: String,
        required: false
    },


    resetPasswordExpires: {
        type: Date,
        required: false
    }

})

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;