const mongoose = require('mongoose');
const crypto = require('crypto');

const productSchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => crypto.randomUUID(),
    },


    title: {
        type: String,
        required: true
    },


    description: {
        type: String,
        required: true
    },


    thumbnail: {
        type: String,
        required: true
    },


    images: {
        type: [String], // Array of image URLs
        required: true
    },


    price: {
        type: Number,
        required: true
    },


    compareAtPrice: {
        type: Number
    },


    SKU: {
        type: String,
        required: true
    },


    // Structure of each variant
    // Example: { color: String, size: String, price: Number, stockQty: Number }
    variants: {
        type: [{
            color: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            stockQty: {
                type: Number,
                required: true
            },
        }],
        required: true
    },


    stockQty: {
        type: Number,
        required: true
    },

    // Structure of each review
    // Example: { rating: Number, comment: String, createdBy: String }
    reviews: {
        type: [{

            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdBy: {
                type: String,
                required: true
            },

        }],
        required: true
    },


    category: {
        type: String,
        required: true
    },


    status: {
        type: String,
        enum: ['active', 'inactive'], // Example enum for status
        required: true
    },


    tags: {
        type: [String], // Array of tags
        required: true
    },

    createdBy: {
        type: String,
        required: true
    },


    averageRating: {
        type: Number
    },


    isFeatured: {
        type: Boolean,
        required: true
    },


    metaTitle: {
        type: String
    },


    metaDescription: {
        type: String
    },


    metaKeywords: {
        type: String
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
