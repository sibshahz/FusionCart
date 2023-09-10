const attributesModel = require("../../models/attributes/attributes.model");

async function httpGetAllAttributes(req, res) {
    return res.status(200).json(await attributesModel.getAllAttributes());
}

async function httpPostAttribute(req, res) {
    return res.status(200).json(await attributesModel.postAttribute(req.body));
}

async function httpGetAttribute(req, res) {
    const {id}= req.params;
    return res.status(200).json(await attributesModel.getAttribute(id));
}

async function httpUpdateAttribute(req, res) {
    const {id}=req.params;
    return res.status(200).json(await attributesModel.updateAttribute(id,req.body));

}

async function httpDelAttribute(req, res) {
    const {id} = req.params;
    return res.status(200).json(await attributesModel.delAttribute(id));
}

module.exports = {
  httpGetAllAttributes,
  httpPostAttribute,
  httpGetAttribute,
  httpUpdateAttribute,
  httpDelAttribute,
};