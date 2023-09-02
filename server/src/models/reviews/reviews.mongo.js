const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewRating: {
    type: Number,
    required: true,
  },
  reviewDescription: String,
  reviewProduct: {
    type : mongoose.Schema.Types.ObjectId ,
    ref: 'Product',
    required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  reviewStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
},{
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;