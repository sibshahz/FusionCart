const cartModel=require("../../models/cart/cart.model")

async function httpGetAllCartItems(req,res){
  const {id}=req.params;
  return res.status(200).json(await cartModel.getAllCartItems(id));
}
async function httpPostCartItem(req,res){
  return res.status(200).json(await cartModel.postCartItem(req.body));
}

async function httpGetCartItem(req,res){
  const {id}=req.params
  return res.status(200).json(await cartModel.getCartItem(id));
}

async function httpUpdateCartItem(req,res){
  const {id}=req.params;
  const {quantity}=req.body;
  return res.status(200).json(await cartModel.updateCartItem(id,quantity));
  
}

async function httpDelCartItem(req,res){
  const {id}=req.params;
  return res.status(200).json(await cartModel.delCartItem(id));
}

module.exports={
  httpDelCartItem,
  httpGetAllCartItems,
  httpGetCartItem,
  httpPostCartItem,
  httpUpdateCartItem,
}