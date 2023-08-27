const express = require('express');
const passport = require('passport');
const jwtStrategy = require('../../services/passport.strategy'); // Implement this strategy in the next step
const authController = require('./user-auth.controller');

const userAuthRouter = express.Router();


userAuthRouter.post('/signup', authController.signup);


userAuthRouter.get('/protected',authController.isUserAuthenticated,(req,res) => {
    res.status(200).send({message: "you are now on protected route"});
});

userAuthRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);

module.exports = userAuthRouter;
