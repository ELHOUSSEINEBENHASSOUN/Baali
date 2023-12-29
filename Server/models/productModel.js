const mongoose = require('mongoose');

// 1- Définition du schéma
const productSchema = new mongoose.Schema({

    // _id: { type: String, default: () => crypto.randomUUID() },

    title: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    thumbnail: { type: String, required: true },

    images: { type: Array, required: true },

    price: { type: Number, required: true, min: 0 },

    compareAtPrice: { type: Number, min: 0 },

    SKU: { type: String, required: true, unique: true, trim: true },

    variants: {
        type: [{
            color: { type: String, required: false, trim: true },
            size: { type: String, required: false, trim: true },
            price: { type: Number, default: 0, trim: true },
            stockQty: { type: Number, default: 0, trim: true },
        }],
        required: false,
    },

    stockQty: { type: Number, required: true, min: 0 },

    reviews: {
        type: [{
            rating: { type: Number, required: true, min: 1, max: 5 },
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

    isFeatured: { type: Boolean, default: false },

    metaTitle: { type: String, trim: true },

    metaDescription: { type: String, trim: true },

    metaKeywords: { type: String, trim: true },

},
    { timestamps: true, versionKey: false }
);
// 2- Définition du modèle de product
const Product = mongoose.model('Product', productSchema);
// 3- Exportation du modèle de account et du schéma de validation
module.exports = { Product }
