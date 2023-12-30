const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
  imageTitle: {
    type: String,
  },
  imageAlt: {
    type: String,
  },
  imageDescription: {
    type: String,
  },
  imagePath:{
    type: String,
    required: true,
  }
},{
  timestamps: true,
});

const Image = mongoose.model('Image', imagesSchema);

module.exports = Image;