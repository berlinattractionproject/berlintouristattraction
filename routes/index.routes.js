const express = require('express');
const router = express.Router();
const Place = require("../models/Place.model");

/* GET home page */
router.get("/", (req, res, next) => {
  const {currentUser} = req.session
  currentUser.isLoggedIn = true
  Place.find()
  .then((place) => res.render("place/placelist", { place, currentUser }))
  .catch((err) => console.log(err));
  //res.render("index");
});

module.exports = router;
