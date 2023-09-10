const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const categoryController = require('./categories.controller');

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.httpGetAllCategories);
categoryRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"), categoryController.httpPostCategory);
categoryRouter.get('/:id', categoryController.httpGetCategory);
categoryRouter.put('/:id', categoryController.httpUpdateCategory);
categoryRouter.delete('/:id', categoryController.httpDelCategory);

module.exports = categoryRouter;