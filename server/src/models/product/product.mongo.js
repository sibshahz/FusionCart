const mongoose = require('mongoose');
const Image=require('../images/images.mongo.js');

const productSchema = new mongoose.Schema({
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
