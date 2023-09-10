const tagModel = require("../../models/tags/tags.model");

async function httpGetAllTags(req, res) {
    return res.status(200).json(await tagModel.getAllTags());
}

async function httpPostTag(req, res) {
    return res.status(200).json(await tagModel.postTag(req.body));
}

async function httpGetTag(req, res) {
    const {id}= req.params;
    return res.status(200).json(await tagModel.getTag(id));
    
}

async function httpUpdateTag(req, res) {
    const {id}=req.params;
    return res.status(200).json(await tagModel.updateTag(id,req.body));

}

async function httpDelTag(req, res) {
    const {id} = req.params;
    return res.status(200).json(await tagModel.delTag(id));
}

module.exports = {
  httpGetAllTags,
  httpPostTag,
  httpGetTag,
  httpUpdateTag,
  httpDelTag,
};