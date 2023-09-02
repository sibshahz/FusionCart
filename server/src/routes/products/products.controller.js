const { getAllProducts } = require('../../models/product/product.model');

async function httpGetAllProducts(req, res) {
    return res.status(200).json({name:"products",payload:"sent successfully"})
}

module.exports = {
  httpGetAllProducts,
};