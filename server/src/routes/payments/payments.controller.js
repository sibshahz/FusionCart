const { getProductSalePrice } = require("../../models/product/product.model");

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
async function httpPostPayment(req,res){
  const { 
    // customer,
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

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports={
  httpPostPayment,
}