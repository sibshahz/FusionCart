const express = require('express');
const productsRouter = require("./products/products.router");
const adminsRouter = require("./admins/admins.router");
const userAuthRouter = require('./user-auth/user-auth.router');
const tagsRouter = require('./tags/tags.router');
const categoryRouter = require('./categories/categories.router');
const attributesRouter = require('./attributes/attributes.router');
const reviewsRouter = require('./reviews/reviews.router');

const api = express.Router();

api.use('/auth', userAuthRouter);
api.use('/products', productsRouter);
api.use('/admins',adminsRouter);
api.use('/tags',tagsRouter);
api.use('/categories',categoryRouter);
api.use('/attributes',attributesRouter);
api.use('/reviews',reviewsRouter);

module.exports = api;