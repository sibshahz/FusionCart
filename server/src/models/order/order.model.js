const mongoose = require('mongoose');
const Order = require("./order.mongo");
async function addOrder(orderData) {
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
  } catch (err) {
    console.error(`Error adding order: ${err}`);
  }
}

async function getAllOrders(customerID){
  try {
    const orders = await Order.find({customer:customerID});
    return orders;
  } catch (error) {
    console.error("Error getting orders",error);
  }
}

module.exports={
  addOrder,
  getAllOrders
}