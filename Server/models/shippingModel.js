const mongoose = require('mongoose');
const Joi = require('joi');

// 1- Définition du schéma
const ShippingSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true , trim: true  },
    cost: { type: Number, required: true , trim: true  },
    estimatedDelivery: { type: String, required: true , trim: true },
    regions: { type: Array, default: []}
}, 
    { timestamps: true, versionKey: false }
);

// 2- Définition du schéma de validation avec Joi
const shippingValidationSchema = Joi.object({
    type: Joi.string().required(),
    cost: Joi.number().required(),
    estimatedDelivery: Joi.string().required(),
    regions: Joi.array().items(Joi.string()).required(),
    title: Joi.string().required()
});

// 3- Définition du modèle de shipping
const Shipping = mongoose.model('Shipping', ShippingSchema);

// 4- Exportation du modèle de shipping et du schéma de validation
module.exports = {
    Shipping,
    shippingValidationSchema
};
