const mongoose = require('mongoose');
const Joi = require('joi');

// 1- Définition du schéma
const OrderSchema = new mongoose.Schema({
    products: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, trim: true },
    paymentMethod: { type: String, required: true, trim: true },
    customer: { type: String, required: true, trim: true },
    discount: { type: Number, required: true },
    tax: { type: Number, required: true },
    shippingAddress: { type: Array, required: true },
    trackingNumber: { type: String, required: true, trim: true },
    billingAddress: { type: Array, required: true },
    orderNotes: { type: String, trim: true }
}, 
{ timestamps: true, versionKey: false }
);


const orderValidationSchema = Joi.object({
  products: Joi.array().required(),
  totalPrice: Joi.number().required(),
  status: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  customer: Joi.string().required(),
  discount: Joi.number().required(),
  tax: Joi.number().required(),
  shippingAddress: Joi.array().required(),
  trackingNumber: Joi.string().required(),
  billingAddress: Joi.array().required(), 
  orderNotes: Joi.string()
});


// 3- Définition du modèle de commande
const Order = mongoose.model('Order', OrderSchema);

// 4- Exportation du modèle de commande et du schéma de validation
module.exports = {
    Order,
    orderValidationSchema
};
