const express = require('express');

const {
  httpGetAllProducts,
  httpPostProduct,
  httpGetProduct,
  httpUpdateProduct,
  httpDelProduct,
  httpGetProductCategory,
  httpGetProductTags,
  httpGetProductCatAndTags
} = require('./products.controller');

const productsRouter = express.Router();

productsRouter.get('/', httpGetAllProducts);
productsRouter.post('/', httpPostProduct);
productsRouter.get('/:id', httpGetProduct);
productsRouter.put('/:id', httpUpdateProduct);
productsRouter.delete('/:id', httpDelProduct);
productsRouter.get('/category/:categoryId', httpGetProductCategory);
productsRouter.get('/tags?tagIds', httpGetProductTags);
productsRouter.get('/category/:categoryId/tags?tagIds', httpGetProductCatAndTags);

module.exports = productsRouter;