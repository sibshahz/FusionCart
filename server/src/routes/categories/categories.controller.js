const categoryModel = require("../../models/categories/categories.model");

async function httpGetAllCategories(req, res) {
    return res.status(200).json(await categoryModel.getAllCategories());
}

async function httpPostCategory(req, res) {
    return res.status(200).json(await categoryModel.postCategory(req.body));
}

async function httpGetCategory(req, res) {
    const {id}= req.params;
    return res.status(200).json(await categoryModel.getCategory(id));
    
}

async function httpUpdateCategory(req, res) {
    const {id}=req.params;
    return res.status(200).json(await categoryModel.updateCategory(id,req.body));

}

async function httpDelCategory(req, res) {
    const {id} = req.params;
    return res.status(200).json(await categoryModel.delCategory(id));
}

module.exports = {
  httpGetAllCategories,
  httpPostCategory,
  httpGetCategory,
  httpUpdateCategory,
  httpDelCategory,
};