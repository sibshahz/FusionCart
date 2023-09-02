const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;