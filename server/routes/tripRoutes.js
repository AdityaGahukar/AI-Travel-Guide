const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  seedTrips,
} = require("../controllers/tripController");

// GET /api/trips - Get all suggested trips
router.get("/", getAllTrips);

// GET /api/trips/seed - Seed initial trips (for development)
router.get("/seed", seedTrips);

// GET /api/trips/:id - Get single trip by ID
router.get("/:id", getTripById);

module.exports = router;
