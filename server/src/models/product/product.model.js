// import Product from "./product.mongo";
const Product = require("./product.mongo");

async function addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      console.log(`Product added successfully: ${newProduct}`);
    } catch (err) {
      console.error(`Error adding product: ${err}`);
    }
}

async function getAllProducts(){
  return true;
}

module.exports={getAllProducts}