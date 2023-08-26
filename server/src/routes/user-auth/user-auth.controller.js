const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user.model');


const signup = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
  
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json(error.message)
    }
  };

const login = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key');
  res.json({ user, token });
};


module.exports = {
  signup,
  login
};
