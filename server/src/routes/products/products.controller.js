const { getAllProducts,addProduct } = require('../../models/product/product.model');

async function httpGetAllProducts(req, res) {
    return res.status(200).json(await getAllProducts());
}
async function httpPostProduct(req, res) {
  console.log("REQ: ", req);
  return res.status(200).json(await addProduct(req.body));
}
async function httpGetProduct(req, res) {
  return res.status(200).json(await getProduct());
}
async function httpUpdateProduct(req, res) {
  return res.status(200).json({name:"products",payload:"sent successfully"})
}
async function httpDelProduct(req, res) {
  return res.status(200).json({name:"products",payload:"sent successfully"})
}
async function httpGetProductCategory(req, res) {
  return res.status(200).json(await getProductCategory());
}
async function httpGetProductTags(req, res) {
  return res.status(200).json(await getProductTags());
}
async function httpGetProductCatAndTags(req, res) {
  return res.status(200).json(await getProductCatAndTags());
}

module.exports = {
  httpGetAllProducts,
  httpPostProduct,
  httpGetProduct,
  httpUpdateProduct,
  httpDelProduct,
  httpGetProductCategory,
  httpGetProductTags,
  httpGetProductCatAndTags
};