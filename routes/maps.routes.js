const express = require("express");
const { resource } = require("../app");
const router = express.Router();
const Place = require("../models/Place.model");

router.get('/api', (req, res, next) => {
	Place.find({}, (error, allPlaces) => {
		if (error) { 
			next(error); 
		} else { 
			res.status(200).json({ places:allPlaces });
		}
	});
});

module.exports = router;
