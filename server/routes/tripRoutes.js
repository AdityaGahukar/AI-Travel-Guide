// routes/tripRoutes.js
import express from "express";
import { getAllTrips, getTripById, seedTrips } from "../controllers/tripController.js";

const router = express.Router();

// GET /api/trips - Get all suggested trips
router.get("/", getAllTrips);

// GET /api/trips/seed - Seed initial trips (for development)
router.get("/seed", seedTrips);

// GET /api/trips/:id - Get single trip by ID
router.get("/:id", getTripById);

export default router;
