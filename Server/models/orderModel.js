const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  products: { type: Array, required: true },
  timestamp: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  status: { type: String },
  paymentMethod: { type: String },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Assuming you have a Customer model
  discount: { type: Number },
  tax: { type: Number },
  shippingAddress: { type: Object },
  trackingNumber: { type: String },
  billingAddress: { type: Object },
  orderNotes: { type: String }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
