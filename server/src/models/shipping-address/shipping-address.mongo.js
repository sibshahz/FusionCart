const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  shippingCity: {
    type: String,
    required: true,
  },
  shippingState: {
    type: String,
    required: true,
  },
  shippingCountry: {
    type: String,
    required: true,
  },
  shippingPostalCode: String,
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},{
  timestamps: true,
});


const shippingAddress = mongoose.model('ShippingAddress', shippingSchema);

module.exports = shippingAddress;