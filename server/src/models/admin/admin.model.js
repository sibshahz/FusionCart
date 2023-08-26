const Admin = require("./admin.mongo");

async function addAdmin(admin) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      console.log(`Product added successfully: ${newProduct}`);
    } catch (err) {
      console.error(`Error adding product: ${err}`);
    }
}

async function getAllAdmins(){
    return true
}


module.exports={addAdmin,getAllAdmins}