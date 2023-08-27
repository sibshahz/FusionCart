const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user/user.model');
const bcrypt = require('bcrypt');

passport.use('local',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return done(null, false, { message: 'Incorrect email' });
    
    console.log(password)
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("🚀 ~ file: passport.strategy.js:16 ~ isValidPassword:", isValidPassword)
    
    if (!isValidPassword) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));