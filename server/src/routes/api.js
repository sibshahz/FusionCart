const express = require('express');
const productsRouter = require("./products/products.router");
const adminsRouter = require("./admins/admins.router");
const userAuthRouter = require('./user-auth/user-auth.router');
const tagsRouter = require('./tags/tags.router');
const categoryRouter = require('./categories/categories.router');
const attributesRouter = require('./attributes/attributes.router');
const reviewsRouter = require('./reviews/reviews.router');
const imagesRouter = require('./images/images.router');
const paymentRouter = require('./payments/payments.router');
const cartRouter = require('./cart/cart.router');

const api = express.Router();

api.use('/auth', userAuthRouter);

api.use('/create-payment',paymentRouter)
api.use('/products', productsRouter);
api.use('/images',imagesRouter)
api.use('/admins',adminsRouter);
api.use('/tags',tagsRouter);
api.use('/categories',categoryRouter);
api.use('/attributes',attributesRouter);
api.use('/reviews',reviewsRouter);
api.use('/cart',cartRouter);

module.exports = api;