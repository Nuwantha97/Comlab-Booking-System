const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  Role: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
