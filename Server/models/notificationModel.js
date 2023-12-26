const mongoose=require('mongoose');
const Joi = require('joi');

//1-Définition du schéma
const notificationSchema = new mongoose.Schema({
    
    accountId: { type: String, required: true, trim: true},
    type: { type: String, required: true, trim: true},
    message: {type: String, required: true, trim: true},
    status: { type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now}
}, { versionKey: false});


// 2- Définition du schéma de validation avec Joi
const notificationValidationSchema = Joi.object({
    accountId: Joi.string(),
    type: Joi.string().required(),
    message: Joi.string().required(),
    status: Joi.string().required(),
    createdAt: Joi.date().iso().max('now')
});

// 3- Définition du modèle de notification
const Notification = mongoose.model('Notification', notificationSchema);

// 4- Exportation du modèle de notification et du schéma de validation
module.exports = {
    Notification,
    notificationValidationSchema
};
