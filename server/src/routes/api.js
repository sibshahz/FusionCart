const express = require('express');
const productsRouter = require("./products/products.router");
const adminsRouter = require("./admins/admins.router");
const userAuthRouter = require('./user-auth/user-auth.router');
const tagsRouter = require('./tags/tags.router');

const api = express.Router();

api.use('/auth', userAuthRouter);
api.use('/products', productsRouter);
api.use('/admins',adminsRouter);
api.use('/tags',tagsRouter);

module.exports = api;