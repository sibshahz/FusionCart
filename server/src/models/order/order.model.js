const mongoose = require('mongoose');
const Order = require("./order.mongo");
const Product = require('../product/product.mongo');
async function addOrder(orderData) {
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
  } catch (err) {
    console.error(`Error adding order: ${err}`);
  }
}

async function getAllOrders(customerID) {
  try {
    const orders = await Order.find({ customer: customerID })
      .populate({path:'productsOrdered',model:'Product'})
      .exec();
    



    console.log("Populated Orders:", orders); // Add this line for debugging

    return orders;
  } catch (error) {
    console.error("Error getting orders", error);
    throw error;
  }
}


module.exports={
  addOrder,
  getAllOrders
}