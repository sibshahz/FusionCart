
const Cart = require("./cart.mongo");

async function postCartItem(cartData) {
  try {
    const newCart = new Cart(cartData);
    await newCart.save();
    return newCart;
  } catch (err) {
    console.error(`Error adding cart: ${err}`);
  }
}

async function getAllCartItems(id){
  try {
    const carts = await Cart.find({user:id})
    .populate({
      path:'product',
      model:'Product',
      populate:{
        path:'images',
        model:'Image',
      }
    })
    .exec();
    return carts;
  } catch (err) {
    console.error(err);
  }
}

async function getCartItem(id){
  try {
    const cart=await Cart.findById(id).populate('product').exec();
    return cart;
  } catch (error) {
    console.log(error);
  }
}

async function updateCartItem(id,update){
  try{
    const updatedCart= await Cart.findByIdAndUpdate(id,update,{new: true});
    return updatedCart;
  }catch(error){
    console.log(error);
  }
}

async function delCartItem(id){
  try {
    const cartDeleted=await Cart.findByIdAndDelete(id);
    return cartDeleted;
  } catch (error) {
    console.log(error);
  }
}


module.exports={
  getAllCartItems,
  postCartItem,
  getCartItem,
  updateCartItem,
  delCartItem,
}