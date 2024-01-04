const mongoose = require('mongoose');
const Joi = require('joi');

// 1- Définition du schéma
const CategorySchema = new mongoose.Schema({
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    parentCategory: { type: String, required: false, trim: true },
    isActive: { type: Boolean, required: true },
}, { versionKey: false });

// 2- Définition du schéma de validation avec Joi
const categoryValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    createdAt: Joi.date().iso().max('now'),
    parentCategory: Joi.string().allow(null),
    isActive: Joi.boolean().required(),
});

// 3- Définition du modèle de Category
const Category = mongoose.model('Category', CategorySchema);

// 4- Exportation du modèle de Category et du schéma de validation
module.exports = {
    Category,
    categoryValidationSchema
};