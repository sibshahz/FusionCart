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

module.exports={
  addOrder,
}