const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const productsController = require('./products.controller');

const productsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to Products
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - id: 1
 *                   title: "Buy groceries"
 *                 - id: 2
 *                   title: "Complete homework"
 *
 *   post:
 *     summary: Create a new todo
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       '201':
 *         description: Todo created successfully
 *       '400':
 *         description: Bad request
 */

productsRouter.get(
  '/',
  productsController.httpGetAllProducts);

productsRouter.post(
  '/',
  authController.isUserAuthenticatedAuthorized("admin"),
  productsController.httpPostProduct);

productsRouter.get(
  '/:id', 
  productsController.httpGetProduct);

productsRouter.put(
  '/:id', 
  authController.isUserAuthenticatedAuthorized("admin"),
  productsController.httpUpdateProduct);

  productsRouter.delete(
  '/:id', 
  authController.isUserAuthenticatedAuthorized("admin"), 
  productsController.httpDelProduct);

productsRouter.get(
  '/category/:categoryId',
  productsController.httpGetProductCategory);

productsRouter.get(
  '/tags?tagIds',
  productsController.httpGetProductTags);

productsRouter.get(
  '/category/:categoryId/tags?tagIds',
   productsController.httpGetProductCatAndTags);

module.exports = productsRouter;