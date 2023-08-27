const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  hash: String
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

module.exports = mongoose.model('User', userSchema);