//Requiring models

var mongoose = require("mongoose"),
  Comment = require("./comment"),
  Review = require("./review");

// Variable creation to store all data related to a campground in an object.

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  location: String,
  lat: Number,
  lng: Number,
  createdAt: { type: Date, default: Date.now },
  cost: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  rating: {
    type: Number,
    default: 0
  }
});

//Export file and make it available to the rest of the application.

module.exports = mongoose.model("Campground", campgroundSchema);

