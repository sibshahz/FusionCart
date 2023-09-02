const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  billingCity: {
    type: String,
    required: true,
  },
  billingState: {
    type: String,
    required: true,
  },
  billingCountry: {
    type: String,
    required: true,
  },
  billingPostalCode: String,
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


const BillingAddress = mongoose.model('BillingAddress', billingSchema);

module.exports = BillingAddress;