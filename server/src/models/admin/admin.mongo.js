const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Developer", "Admin", "Moderator", "Blogger"],
    require: true
  },
  avatarUrl: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;