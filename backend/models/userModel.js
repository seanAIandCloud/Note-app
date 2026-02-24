const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },        // user name
  email: { type: String, required: true, unique: true }, // email (unique)
  password: { type: String, required: true },    // hashed password
}, { timestamps: true });                         // auto createdAt/updatedAt

module.exports = mongoose.model('User', userSchema);