const express = require('express');
const authController = require('../user-auth/user-auth.controller');

const attributesController = require('./attributes.controller');

const attributesRouter = express.Router();

attributesRouter.get('/', attributesController.httpGetAllAttributes);
attributesRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"), attributesController.httpPostAttribute);
attributesRouter.get('/:id', attributesController.httpGetAttribute);
attributesRouter.put('/:id', attributesController.httpUpdateAttribute);
attributesRouter.delete('/:id', attributesController.httpDelAttribute);

module.exports = attributesRouter;