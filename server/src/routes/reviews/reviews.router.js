const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const reviewsController = require('./reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get('/', reviewsController.httpGetAllReviews);
reviewsRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"), reviewsController.httpPostReview);
reviewsRouter.get('/:id', reviewsController.httpGetReview);
reviewsRouter.put('/:id', reviewsController.httpUpdateReview);
reviewsRouter.delete('/:id', reviewsController.httpDelReview);

module.exports = reviewsRouter;