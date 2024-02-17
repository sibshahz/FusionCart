const orderModel = require('../../models/order/order.model');
async function httpGetAllOrders(req, res) {
  try {
    const { customerID } = req.params;
    const orders = await orderModel.getAllOrders(customerID);
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in httpGetAllOrders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  httpGetAllOrders
}