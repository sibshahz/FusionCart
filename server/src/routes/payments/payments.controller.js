const { getProductSalePrice } = require("../../models/product/product.model");
const {addOrder} = require("../../models/order/order.model");
const {delCartItem} = require("../../models/cart/cart.model");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

async function calculateOrderAmount (items) {
  const promises = items.map(async (item) => {
    const productSalePrice = await getProductSalePrice(item.product._id);
    return productSalePrice || 0; // Return 0 if productSalePrice is falsy
  });

  const prices = await Promise.all(promises);
  const totalAmount = prices.reduce((acc, price) => acc + price, 0);
  return totalAmount;
  
};

async function deleteFromCart(items){
  try {
    items.forEach(async (item) => {
      await delCartItem(item._id);
    });
    return true;    
  } catch (error) {
    console.error("Error deleting items from cart",error)
    return false;
  }

}

async function httpPostPayment(req,res){
  try {
    const { 
      customer,
      // orderDate,
      productsOrdered,
      // orderStatus,
      // orderTotal,
    } = req.body;
    const totalAmount =await calculateOrderAmount(productsOrdered);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    await deleteFromCart(productsOrdered)
    const orderDetails=await addOrder({customer,productsOrdered,orderTotal:totalAmount,paymentIntentID:paymentIntent.id});
  
    res.send({
      clientSecret: paymentIntent.client_secret,
      orderDetails
    });    
  } catch (error) {
    console.error("Error in httpPostPayment",error);
  }

}

module.exports={
  httpPostPayment,
}