var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

//var campgrounds = [
//  {name: "Salmon Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
//  {name: "Tuna Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
//  {name: "Shark Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"}
//]

//Campground.create(
//  {
//    name:"Salmon Creek",
//    image:"https://image.shutterstock.com/z/stock-photo-blured-image-of-camping-and-tent-with-high-iso-grained-picture-under-the-pine-forest-in-sunset-at-581001244.jpg",
//    description:"This is a blurred campground. I wonder how much text this field can hold"
//  },
//  function(err, campground) {
//    if(err) {
//      console.log(err);
//    } else {
//      console.log("added new campground");
//      console.log(campground);
//    }
//  });
//
//app.get("/", function(req, res) {
//  res.render("landing");
//});

// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
      if(err) {
          console.log(err);
      } else {
          res.render("index", {campgrounds:allCampgrounds});
      }
  });
});

// CREATE ROUTE - add new campgrounds to db
app.post("/campgrounds", function(req, res) {
  //res.send("You  hit the post route");
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // save campground to db
  Campground.create(newCampground, function(err, newlyCreated) {
      if(err) {
          console.log(err);
      } else {
          // redirect back to campgrounds page
          res.redirect("/campgrounds");
      }
  });
});

// NEW ROUTE - show form to create a new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// SHOW ROUTE - show the details of specified campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with the provided id
  //res.send("THIS WILL BE THE SHOW PAGE");
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});


app.listen(3000, process.env.IP, function() {
  console.log("YelpCamp Server Has Started!");  
});
