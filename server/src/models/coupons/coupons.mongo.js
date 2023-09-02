const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  discountType: {
    type: String,
    enum: ['percentage','cart','product'],
  },
  couponAmount: Number,
  freeShipping: {
    type: Boolean,
    default: false,
  },
  expiryDate: {
    type: Date,
    default: () => {
        const currentDate = new Date();
  
        currentDate.setHours(currentDate.getHours() + 24);
  
        return currentDate;
      },
  },
  minimumSpend: Number,
  maximumSpend: Number,
  usageLimit: Number,
  userLimit: Number,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  excludeProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  excludeCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  allowedEmails: [{
    type:String,
  }],
}, {
  timestamps: true,
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
