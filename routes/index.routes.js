const express = require('express');
const { isLoggedIn } = require('../middleware/route-guard');
const router = express.Router();
const Place = require("../models/Place.model");

/* GET home page */
router.get("/", (req, res, next) => {

  
    const {currentUser} = req.session
    console.log(req.session.currentUser);
    if(req.session.currentUser)
    {
      req.session.currentUser.isLoggedIn = true;
    }
    /*req.session.currentUser = true;*/
    Place.find()

  .then((place) => res.render("place/placelist", { place, currentUser }))
  .catch((err) => console.log(err));
  //res.render("index");
});

module.exports = router;
