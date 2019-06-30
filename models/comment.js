//Requiring mongoose 

var mongoose = require("mongoose");

//Creating an object to store all data pertaining to a user's comment.

var commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

//Export the file and make it available for use to the rest of the application.

module.exports = mongoose.model("Comment", commentSchema);