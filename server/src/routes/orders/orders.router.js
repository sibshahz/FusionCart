const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const ordersController = require('./orders.controller');

const ordersRouter = express.Router();



ordersRouter.get(
  '/:customerID',
  authController.isUserAuthenticatedAuthorized("customer"),
  ordersController.httpGetAllOrders);



module.exports = ordersRouter;