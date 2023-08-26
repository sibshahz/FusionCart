const { getAllAdmins } = require('../../models/admin/admin.model');

async function httpGetAllAdmins(req, res) {
//   return res.status(200).json(await getAllProducts());
    return res.status(200).json({name:"admins",payload:"sent successfully"})
}

module.exports = {
  httpGetAllAdmins,
};