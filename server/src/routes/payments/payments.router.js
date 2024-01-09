const express = require('express');
// const authController = require('../user-auth/user-auth.controller');
const paymentController=require('./payments.controller')


const paymentRouter = express.Router();

paymentRouter.post('/', paymentController.httpPostPayment);

module.exports = paymentRouter;