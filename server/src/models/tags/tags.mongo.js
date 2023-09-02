const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  tagSlug: {
    type: String,
    required: true,
  },
  tagDescription: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;