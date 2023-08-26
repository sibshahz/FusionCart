const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user/user.model');
const bcrypt = require('bcrypt');



//    passport.use(
//       new LocalStrategy(
//         {
//           usernameField: "email",
//           passwordField: "password",
//         },
//         async (email, password, done) => {
//           try {
//             const user = await User.findOne({ email: email });
//             if (!user) return done(null, false);
//             const isMatch = await user.matchPassword(password);
//             if (!isMatch)
//               return done(null, false);
//             // if passwords match return user
//             return done(null, user);
//           } catch (error) {
//             console.log(error)
//             return done(error, false);
//           }
//         }
//       )
//     );
   

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: 'Incorrect email' });
    
    const isValidPassword =  await user.matchPassword(password);
    if (!isValidPassword) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (error) {
    return done(error.message);
  }
}));

