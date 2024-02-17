const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  tagline:String,
  featuredImages:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Image',
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Image',
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'outstock'],
    default: 'draft',
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  stock: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  upsells: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  crossSells: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  attributes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
  }],
  featured: Boolean,
  priceHistory: [
    {
      price: {
        type: Number,
        required: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  paymentIntentID:String,
  paymentStatus: {
    type:String,
    enum:['pending','succeeded','failed'],
    default:'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type:String,
    enum:['pending','shipped','delivered'],
    default:'pending',
  },
  productsOrdered: [orderProductSchema],
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