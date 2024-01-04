const mongoose = require('mongoose');
const Joi = require('joi');

// 1- Définition du schéma
const OfferSchema = new mongoose.Schema({
    code: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    discountType: { type: String, required: true, trim: true },
    discountValue: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    usageLimit: { type: Number, required: true },
    applicableProducts: { type: Array, required: true },
}, { versionKey: false });

// 2- Définition du schéma de validation avec Joi
const offerValidationSchema = Joi.object({
    code: Joi.string().required(),
    description: Joi.string().required(),
    discountType: Joi.string().required(),
    discountValue: Joi.number().required(),
    validFrom: Joi.date().iso().required(),
    validUntil: Joi.date().iso().required(),
    usageLimit: Joi.number().required(),
    applicableProducts: Joi.array().items(Joi.string()).required(),
});

// 3- Définition du modèle de Offer
const Offer = mongoose.model('Offer', OfferSchema);

// 4- Exportation du modèle de Offer et du schéma de validation
module.exports = {
    Offer,
    offerValidationSchema
};