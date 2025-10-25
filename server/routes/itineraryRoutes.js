const express = require("express");
const router = express.Router();
const { generateItinerary } = require("../controllers/itineraryController");

// POST /api/itinerary - Generate AI itinerary
router.post("/", generateItinerary);

module.exports = router;
