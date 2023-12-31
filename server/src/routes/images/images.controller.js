const imageModel = require('../../models/images/images.model')

async function httpGetAllImages(req, res) {
    return res.status(200).json(await imageModel.getAllImages());
}

async function httpPostImages(req, res) {
  return res.status(200).json(await imageModel.addImages(req.body));
}

async function httpUpdateImage(req,res){
  const {id}=req.params;
  return res.status(200).json(await imageModel.updateImage(id,req.body))
}
async function httpGetImage(req, res) {
  const {id}=req.params;
  return res.status(200).json(await imageModel.getImage(id,req.body));
}
async function httpDelImage(req, res) {
  const {id}=req.params;
  return res.status(200).json(await imageModel.delImage(id));
}

module.exports = {
  httpUpdateImage,
  httpGetAllImages,
  httpPostImages,
  httpGetImage,
  httpDelImage,
};