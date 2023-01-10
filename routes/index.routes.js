const express = require('express');
const router = express.Router();
const Place = require("../models/Place.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Place.find()
  .then((place) => res.render("place/placelist", { place }))
  .catch((err) => console.log(err));
  //res.render("index");
});

module.exports = router;
