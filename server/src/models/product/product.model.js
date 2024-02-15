// import Product from "./product.mongo";
const mongoose = require('mongoose');
const Image =require('../images/images.mongo');
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
    const products = await Product.find({}).populate('images').exec();
    return products;
  } catch (err) {
    console.error(err);
  }
}

async function getProduct(id){
  try {
    const product=await Product.findById(id).populate('images').exec();
    return product;
  } catch (error) {
    console.log(error);
  }
}


async function getProductSalePrice(id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return 0;
  }

  try {
    const product = await Product.findById(id,'salePrice').exec();
    return product.salePrice || 0;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting product sale price');
  }
}




async function updateProduct(id,update){
  try{
    const updatedProduct= await Product.findByIdAndUpdate(id,update,{new: true});
    return updatedProduct;
  }catch(error){
    console.log(error);
  }
}

async function delProduct(id){
  try {
    const productDeleted=await Product.findByIdAndDelete(id);
    return productDeleted;
  } catch (error) {
    console.log(error);
  }
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
  getProductCatAndTags,
  getProductSalePrice
}