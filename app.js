var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
    {name: "Tuna Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
    {name: "Shark Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"}
  ]

  res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, process.env.IP, function() {
  console.log("YelpCamp Server Has Started!");  
});
