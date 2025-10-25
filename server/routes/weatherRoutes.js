const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

// GET /api/weather?city=Paris - Get weather for a city
router.get("/", getWeather);

module.exports = router;
