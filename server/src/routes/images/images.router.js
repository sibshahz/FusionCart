const express = require('express');
const imagesController = require('./images.controller');
const authController = require('../user-auth/user-auth.controller');


const imagesRouter = express.Router();

imagesRouter.get(
  '/',
  imagesController.httpGetAllImages);

imagesRouter.post(
  '/',
  authController.isUserAuthenticatedAuthorized("admin"),
  imagesController.httpPostImages);

imagesRouter.put(
  '/:id',
  authController.isUserAuthenticatedAuthorized("admin"),
  imagesController.httpUpdateImage);

imagesRouter.get(
  '/:id', 
  imagesController.httpGetImage);


  imagesRouter.delete(
  '/:id', 
  authController.isUserAuthenticatedAuthorized("admin"), 
  imagesController.httpDelImage);

module.exports = imagesRouter;