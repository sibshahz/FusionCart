const express = require('express');
const authController = require('../user-auth/user-auth.controller');
const zod=require("zod");
const tagsController = require('./tags.controller');

const tagsRouter = express.Router();
// Validation Schema for Tag Model
const tagSchema=zod.object({
  tagName:zod.string(),
  tagSlug:zod.string(),
  tagDescription:zod.string(),
});

const partialTagSchema=tagSchema.partial({
  tagDescription:true,
})

const checkTagData=(req,res,next)=>{
  const response=partialTagSchema.safeParse(req.body);
  if(response.success){
    next();
  }else{
    return res.status(401).json("Bad request bhai");
  }
}

tagsRouter.get('/', tagsController.httpGetAllTags);
tagsRouter.post('/',authController.isUserAuthenticatedAuthorized("admin"),checkTagData, tagsController.httpPostTag);
tagsRouter.get('/:id', tagsController.httpGetTag);
tagsRouter.put('/:id', tagsController.httpUpdateTag);
tagsRouter.delete('/:id', tagsController.httpDelTag);

module.exports = tagsRouter;