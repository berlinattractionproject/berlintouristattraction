const express = require("express");
const { request } = require("http");
const { resource } = require("../app");
const { isLoggedIn } = require("../middleware/route-guard");
const router = express.Router();
const Place = require("../models/Place.model");

/* List of all Places */

router.get("/placelist", (req, res, next) => {
  const { currentUser } = req.session;


  Place.find()
    .then((place) => res.render("place/placelist", { place,currentUser }))
    .catch((err) => console.log(err));
});

router.get("/myplaces", (req, res, next) => {
  console.log(req.session.currentUser)
  const {username} = req.session.currentUser
  const { currentUser } = req.session;

  Place.find({username:username})
    .then((placesFound)=>{
      console.log(placesFound)
      res.render('place/myplaces',{placesFound,currentUser})
    }
    
    )

});

/* Map of all places */

// router.get('/placeMap',(req,res)=>{
//   res.render('place/placeMap')
  
// })

/* Create a new Place */

router.get("/create",isLoggedIn, (req, res) => {
  const allCategories = [];

  const { currentUser } = req.session;


  Place.find()
    .then((allplaces) => {
      allplaces.forEach((place) => {
        if (!allCategories.includes(place.category)) {
          allCategories.push(place.category);
        }
      });
    })
    .then(() => {
      res.render("place/createplace", { allCategories,currentUser });
    })
    .catch((err) => console.log(err));
});

router.post("/create",isLoggedIn, (req, res) => {
  const { name, address, zipCode, description, category } = req.body;
  /* TO ADD: USERID from req.session once auth is in place */
  const username = req.session.currentUser.username; 

  Place.create({ name, address, zipCode, description, category,username})
    .then(res.redirect("/place/placelist"))
    .catch((err) => console.log(err));
});

/* Edit an existing place */

router.get("/detail/:id",isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { currentUser } = req.session;

  Place.findById(id)
    .then((place) => res.render("place/placedetail", {place,currentUser}))
    .catch((err) => console.log(err));
});

router.post('/detail/:id',isLoggedIn,(req,res)=>{
  const { id } = req.params;
  const {name,address,zipCode,category,description} = req.body
  console.log(req.body)
Place.findByIdAndUpdate(id,{name,address,zipCode,category,description})
  .then(()=>res.redirect('/place/myplaces'))
  .catch(err=>console.log(err))
})

/* Delete a place from DB */

router.post("/delete/:id",isLoggedIn, (req, res) => {
  const { id } = req.params;
  console.log('id',id.id)
  Place.findByIdAndDelete(id)
  .then(()=>res.redirect('/place/myplaces'))
  .catch((err) => console.log(err));
});



module.exports = router;
