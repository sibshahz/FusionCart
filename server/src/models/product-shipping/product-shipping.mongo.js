const mongoose = require('mongoose');

const productShippingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productWeight: String,
  productLength: String,
  productWidth: String,
  productHeight: String,
},{
  timestamps: true,
});

const ProductShipping = mongoose.model('ProductShipping', productShippingSchema);

module.exports = ProductShipping;