async function httpGetAllTags(req, res) {
    return true;
    // return res.status(200).json(await productModel.getAllProducts());
}

async function httpPostTag(req, res) {
    return true;
    //   return res.status(200).json(await productModel.addProduct(req.body));
}

async function httpGetTag(req, res) {
    return true;
    //   return res.status(200).json(await productModel.getProduct());
}

async function httpUpdateTag(req, res) {
    return true;
    //   return res.status(200).json(await productModel.updateProduct());
}

async function httpDelTag(req, res) {
    return true;
    //   return res.status(200).json(await productModel.delProduct());
}



module.exports = {
  httpGetAllTags,
  httpPostTag,
  httpGetTag,
  httpUpdateTag,
  httpDelTag,
};