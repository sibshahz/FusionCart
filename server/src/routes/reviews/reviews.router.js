const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const reviewsController = require('./reviews.controller');

const reviewsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Operations related to Reviews
 */


/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
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
 *     summary: Create a new review
 *     tags: [Reviews]
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

reviewsRouter.get('/', reviewsController.httpGetAllReviews);
reviewsRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"), reviewsController.httpPostReview);
reviewsRouter.get('/:id', reviewsController.httpGetReview);
reviewsRouter.put('/:id', reviewsController.httpUpdateReview);
reviewsRouter.delete('/:id', reviewsController.httpDelReview);

module.exports = reviewsRouter;