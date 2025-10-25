// routes/weatherRoutes.js
import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();

// GET /api/weather?city=Paris - Get weather for a city
router.get("/", getWeather);

export default router;
