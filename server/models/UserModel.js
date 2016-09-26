var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  birthday: Date,
  created_at: Date

});

mongoose.model('User', UserSchema);
