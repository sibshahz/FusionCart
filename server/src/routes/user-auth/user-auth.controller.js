const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user.model');

require("../../services/passport.strategy");


const signup = async (req, res) => {
    try {
      const { email, password } = req.body;
  

      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log(hashedPassword)
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });  

    } catch (error) {
        res.status(500).json(error.message)
    }
  };







// const login = (req, res) => {
//   const user = req.user;
//   const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key');

//   // Set the token in the response headers
//   res.setHeader('Authorization', `Bearer ${token}`);

//   // Return user data and token in the response body
//   res.json({ user, token });
// };

// const isUserAuthenticated = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, 'your_secret_key', (err, decoded) => {
//       console.log(token);
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       } else {
//         req.user = decoded; // Attach the decoded user to the request object
//         return next();
//       }
//     });
//   } else {
//     return res.status(401).json({ message: 'Token missing' });
//   }
// };

const login = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key');
  
  // Return user data and token in the response body
  res.setHeader('Authorization', `Bearer ${token}`);
  res.json({ user, token });
};

const isUserAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or invalid' });
  }

  const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      req.user = decoded; // Attach the decoded user to the request object
      return next();
    }
  });
};

// Client-Side:
// When the user logs in and you receive the JWT token in the response, you can manually set the Authorization header for all subsequent requests.

// javascript
// Copy code
// // Assuming you have the token after login
// const token = "your_received_token";

// // Set the Authorization header for all requests
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// When the user logs out, you can remove the Authorization header to effectively log them out.

// javascript
// Copy code
// // Clear the Authorization header when logging out
// delete axios.defaults.headers.common["Authorization"];

module.exports = {
  signup,
  login,
  isUserAuthenticated,
};
