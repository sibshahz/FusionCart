const orderModel = require('../../models/order/order.model');
async function httpGetAllOrders(req, res) {
  const {customerID}=req.params;
  console.log("FUNCTION WAS CALLED")
  console.log("*** customerID", customerID)
  return res.status(200).json(await orderModel.getAllOrders(customerID));
}

module.exports = {
  httpGetAllOrders
}