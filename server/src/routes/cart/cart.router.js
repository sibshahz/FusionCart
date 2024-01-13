const express=require('express');
const authController=require('../user-auth/user-auth.controller')
const cartController=require('./cart.controller');

const cartRouter=express.Router();

cartRouter.get('/:id',authController.isUserAuthenticated,cartController.httpGetAllCartItems)
cartRouter.get('/:id',authController.isUserAuthenticated,cartController.httpGetCartItem)
cartRouter.post('/',authController.isUserAuthenticated,cartController.httpPostCartItem)
cartRouter.put('/:id',authController.isUserAuthenticated,cartController.httpUpdateCartItem)
cartRouter.delete('/:id',authController.isUserAuthenticated,cartController.httpDelCartItem)

module.exports=cartRouter;