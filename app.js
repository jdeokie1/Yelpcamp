//Requiring dotenv, which will connect to the existing file that stores credentials.

require("dotenv").config();

// Requiring dependencies and models.

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comment"),
  Reviews = require("./models/review"),
  session = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  User = require("./models/user"),
  flash = require("connect-flash");

//Creating variables to require and store the various routes.
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  reviewRoutes = require("./routes/review"),
  indexRoutes = require("./routes/index");

//Mongoose configuration
mongoose.connect("mongodb+srv://jdeokie1:pathfinder_05@cluster0-smfki.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//App configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

//Passport configuration

app.use(
  require("express-session")({
    secret: "Donald Trump used to live in my neighbourhood.",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//Requiring routes to be used in the application

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

//App initialization configuration to start the server.
app.listen(3000, process.env.IP, function() {
  console.log("The Yelpcamp server has started!");
});