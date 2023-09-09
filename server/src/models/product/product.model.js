// import Product from "./product.mongo";
const Product = require("./product.mongo");

async function addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (err) {
      console.error(`Error adding product: ${err}`);
    }
}

async function getAllProducts(){
  try {
    const products = await Product.find({});
    return products;
  } catch (err) {
    console.error(err);
  }
}

async function getProduct(){
  return true;
}

async function updateProduct(){
  return true;
}

async function delProduct(){
  return true;
}

async function getProductCategory(){
  return true;
}

async function getProductTags(){
  return true;
}

async function getProductCatAndTags(){
  return true;
}

module.exports={
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  delProduct,
  getProductCategory,
  getProductTags,
  getProductCatAndTags
}