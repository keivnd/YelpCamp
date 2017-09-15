var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
  {name: "Tuna Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"},
  {name: "Shark Creek", image: "https://image.shutterstock.com/z/stock-photo-tourists-in-the-camp-at-rest-enjoy-nature-and-food-211136374.jpg"}
]

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {

  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
  //res.send("You  hit the post route");
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});


app.listen(3000, process.env.IP, function() {
  console.log("YelpCamp Server Has Started!");  
});
