const mongoose = require('mongoose');
const Product = require('../product/product.mongo');

const cartSchema = new mongoose.Schema({
  product: {
    type: Product.schema,  // Reference the Product schema
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
