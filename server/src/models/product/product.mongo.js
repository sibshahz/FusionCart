const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  featuredImages:[{
    type: String,
  }],
  images: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'outstock'],
    default: 'draft',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
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
    required: true,
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
