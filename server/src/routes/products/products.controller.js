const productModel = require('../../models/product/product.model');

async function httpGetAllProducts(req, res) {
    return res.status(200).json(await productModel.getAllProducts());
}

async function httpPostProduct(req, res) {
  return res.status(200).json(await productModel.addProduct(req.body));
}

async function httpGetProduct(req, res) {
  const {id}=req.params;
  return res.status(200).json(await productModel.getProduct(id));
}

async function httpUpdateProduct(req, res) {
  const {id}=req.params;
  return res.status(200).json(await productModel.updateProduct(id,req.body));
}

async function httpDelProduct(req, res) {
  const {id}=req.params;
  return res.status(200).json(await productModel.delProduct(id));
}

async function httpGetProductCategory(req, res) {
  return res.status(200).json(await productModel.getProductCategory());
}

async function httpGetProductTags(req, res) {
  return res.status(200).json(await productModel.getProductTags());
}

async function httpGetProductCatAndTags(req, res) {
  return res.status(200).json(await productModel.getProductCatAndTags());
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