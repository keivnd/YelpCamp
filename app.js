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
    image: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

var campgrounds = [
  {name: "Salmon Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
  {name: "Tuna Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
  {name: "Shark Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"}
]

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
      if(err) {
          console.log(err);
      } else {
          res.render("campgrounds", {campgrounds:allCampgrounds});
      }
  });
});

app.post("/campgrounds", function(req, res) {
  //res.send("You  hit the post route");
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});


app.listen(3000, process.env.IP, function() {
  console.log("YelpCamp Server Has Started!");  
});
