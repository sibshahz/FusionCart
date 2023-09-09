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

module.exports={getAllProducts,addProduct}