const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  cost: { type: Number, required: true },
  estimatedDelivery: { type: String },
  regions: { type: Array },
  title: { type: String, required: true }
});

const Shipping = mongoose.model('Shipping', shippingSchema);

module.exports = Shipping;
