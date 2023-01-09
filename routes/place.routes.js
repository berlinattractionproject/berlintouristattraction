const express = require("express");
const { resource } = require("../app");
const router = express.Router();
const Place = require("../models/Place.model");

/* List of all Places */

router.get("/placelist", (req, res, next) => {
  Place.find()
    .then((place) => res.render("place/placelist", { place }))
    .catch((err) => console.log(err));
});

/* Map of all places */

router.get('/placeMap',(req,res)=>{
  res.render('place/placeMap')
  
})

/* Create a new Place */

router.get("/create", (req, res) => {
  const allCategories = [];

  Place.find()
    .then((allplaces) => {
      allplaces.forEach((place) => {
        if (!allCategories.includes(place.category)) {
          allCategories.push(place.category);
        }
      });
    })
    .then(() => {
      res.render("place/createplace", { allCategories });
    })
    .catch((err) => console.log(err));
});

router.post("/create", (req, res) => {
  const { name, address, zipCode, description, category } = req.body;
  /* TO ADD: USERID from req.session once auth is in place */
  Place.create({ name, address, zipCode, description, category })
    .then(res.redirect("/place/placelist"))
    .catch((err) => console.log(err));
});

/* Edit an existing place */

router.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  Place.findById(id)
    .then((place) => res.render("place/placedetail", place))
    .catch((err) => console.log(err));
});

/* Delete a place from DB */

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  Place.findByIdAndDelete(id).catch((err) => console.log(err))
  .then(()=>res.redirect('/place/placelist'));
});



module.exports = router;
