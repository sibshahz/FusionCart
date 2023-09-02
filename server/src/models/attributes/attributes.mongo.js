const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  attributeName: {
    type: String,
    required: true,
  },
  attributeSlug: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
});


const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;