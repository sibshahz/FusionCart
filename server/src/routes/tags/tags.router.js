const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const tagsController = require('./tags.controller');

const tagsRouter = express.Router();

tagsRouter.get('/', tagsController.httpGetAllTags);
tagsRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"), tagsController.httpPostTag);
tagsRouter.get('/:id', tagsController.httpGetTag);
tagsRouter.put('/:id', tagsController.httpUpdateTag);
tagsRouter.delete('/:id', tagsController.httpDelTag);

module.exports = tagsRouter;