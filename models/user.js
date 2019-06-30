//Mongoose and passport setup

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Creating an object to store all data related to a user.

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  firstName: String,
  lastName: String,
  email: String,
  isAdmin: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose);

// Export file and make the data useable by the rest of the application.
module.exports = mongoose.model("User", userSchema);