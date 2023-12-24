const mongoose = require('mongoose');
const crypto = require('crypto');

const productSchema = new mongoose.Schema({

    // _id: { type: String, default: () => crypto.randomUUID() },

    title: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    thumbnail: { type: String, required: true },

    images: { type: Array, required: true },

    price: { type: Number, required: function () { return this.status } },

    compareAtPrice: { type: Number, required: false },

    SKU: { type: String, required: true, unique: true, trim: true },

    variants: {
        type: [{
            color: { type: String, required: false, trim: true },
            size: { type: String, required: false, trim: true },
            price: { type: Number, required: false, trim: true },
            stockQty: { type: Number, required: false, trim: true },
        }],
        required: false
    },

    stockQty: { type: Number, required: true },

    reviews: {
        type: [{
            rating: { type: Number, required: true },
            comment: { type: String, required: true, trim: true },
            createdBy: { type: String, required: true, trim: true },

        }],
        required: true
    },

    category: { type: String, required: true, trim: true },

    status: { type: String, required: true, trim: true },

    tags: { type: Array, required: true },

    createdBy: { type: String, required: true, trim: true },

    averageRating: { type: Number, required: true },

    isFeatured: { type: Boolean, required: false },

    metaTitle: { type: String, required: false, trim: true },

    metaDescription: { type: String, required: false, trim: true },

    metaKeywords: { type: String, required: false, trim: true }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
