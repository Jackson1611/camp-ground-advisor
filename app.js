const express = require("express");
const app = express();
const path = require("path");
const Campground = require("./models/campground");
const mongoose = require("mongoose");

const port = 3000;

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/campground", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgorunds/index");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Serving on port 3000");
});
