const Category = require("./categories.mongo");

async function getAllCategories() {
    try {
    const categories= await Category.find({});
    return categories;        
    } catch (error) {
        console.log(error);
    }
}

async function postCategory(categoryData) {
    try {
        const newCategory= new Category(categoryData);
        await newCategory.save();
        return newCategory;
    } catch (error) {
        console.log(error);
    }
}

async function getCategory(id) {
    try {
        const category= await Category.findById(id);
        return category;
    } catch (error) {
        console.log(error);
    }
}

async function updateCategory(id, update) {
    try {
        const updatedCategory= await Category.findByIdAndUpdate(id,update,{new: true});
        return updatedCategory;
    } catch (error) {
        console.log(error);
    }
}

async function delCategory(id) {
    try {
        const categoryDeleted=await Category.findByIdAndDelete(id);
        return categoryDeleted;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
  getAllCategories,
  postCategory,
  getCategory,
  updateCategory,
  delCategory,
};