// import Product from "./product.mongo";
const Product = require("./product.mongo");
const path = require("path");
const fs = require("fs");

async function addProduct(productData) {
  try {
    const images = productData.images; // Assuming productData.images is an array of image paths or Buffers

    // Create a directory for the product if it doesn't exist
    const productDirectory = path.join(__dirname, 'public', 'images', productData.name);
    if (!fs.existsSync(productDirectory)) {
      fs.mkdirSync(productDirectory, { recursive: true });
    }

    // Array to store the paths of the saved images
    const savedImagePaths = [];

    // Process each image
    for (const image of images) {
      const imageFileName = `${Date.now()}_${path.basename(image)}`;
      const imagePath = path.join(productDirectory, imageFileName);

      // Save the image to the server's public directory
      if (typeof image === 'string') {
        // If the image is a path, read it from the file system
        fs.copyFileSync(image, imagePath);
      } else if (Buffer.isBuffer(image)) {
        // If the image is a Buffer, write it to the file system
        fs.writeFileSync(imagePath, image);
      } else {
        // Handle other cases (e.g., invalid image format)
        console.error('Invalid image format:', image);
        continue;
      }

      // Store the path to the saved image
      savedImagePaths.push(`/images/${productData.name}/${imageFileName}`);
    }

    // Create a new Product instance with the updated images property
    const newProduct = new Product({
      ...productData,
      images: savedImagePaths,
    });

    // Save the product to the database
    await newProduct.save();

    // Return the saved product
    return newProduct;
  } catch (err) {
    console.error(`Error adding product: ${err}`);
    throw err; // Propagate the error up the call stack
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

async function getProduct(id){
  try {
    const product=await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
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
  getProductCatAndTags
}