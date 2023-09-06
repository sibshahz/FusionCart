const passport = require('passport');
// const User = require('../models/user/user.model');
const User = require('../models/user/user.mongo')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use('local',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    console.log(User)
    const iuser = await User.findOne({ email });
    

    if (!iuser) return done(null, false, { message: 'Incorrect email' });
    
    const isValidPassword = await bcrypt.compare(password, iuser.password);
    
    if (!isValidPassword) return done(null, false, { message: 'Incorrect password' });

    return done(null, iuser);
  } catch (error) {
    return done(error);
  }
}));
