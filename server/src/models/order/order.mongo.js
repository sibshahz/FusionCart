const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: String,
  productsOrdered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  }],
  orderTotal: {
    type: Number,
    required: true,
  },
  orderCoupons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Coupon',
  }],
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'BillingAddress',
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'ShippingAddress',
  },
  orderPhone: String,
},{
  timestamps: true,
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;