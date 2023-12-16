const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
      unique: true,
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BillingAddress'
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingAddress'
  },
  userType: {
    type: String,
    enum: ['customer', 'admin', 'moderator'],
    default: 'customer',
  },
  country: String,
  state: String,
  city: String,
  postalCode: String,
  password: String,
  avatarUrl: String,
},{
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if(this.isModified('password')){
    const user=this;
    bcrypt.hash(user.password,10,function(err,hash){
      if(err){
        return next(err);
      }
      user.password=hash;
      next();
    })
  }else{
    this.password= hash;
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;