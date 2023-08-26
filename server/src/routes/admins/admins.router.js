const express = require('express');

const {
  httpGetAllAdmins,
} = require('./admins.controller');

const adminsRouter = express.Router();

adminsRouter.get('/', httpGetAllAdmins);

module.exports = adminsRouter;