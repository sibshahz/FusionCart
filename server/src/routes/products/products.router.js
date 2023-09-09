const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const productsController = require('./products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.httpGetAllProducts);
productsRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"), productsController.httpPostProduct);
productsRouter.get('/:id', productsController.httpGetProduct);
productsRouter.put('/:id', productsController.httpUpdateProduct);
productsRouter.delete('/:id', productsController.httpDelProduct);
productsRouter.get('/category/:categoryId', productsController.httpGetProductCategory);
productsRouter.get('/tags?tagIds', productsController.httpGetProductTags);
productsRouter.get('/category/:categoryId/tags?tagIds', productsController.httpGetProductCatAndTags);

module.exports = productsRouter;