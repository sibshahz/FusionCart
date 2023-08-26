const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  stock: {
    type: Number,
    required: false
  },
  imageUrl: String,
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
