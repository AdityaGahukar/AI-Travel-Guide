const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const itineraryRoutes = require("./routes/itineraryRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const tripRoutes = require("./routes/tripRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    // Don't exit process, allow app to run without DB for API testing
    console.log("⚠️  Running without database connection");
  }
};

connectDB();

// API Routes
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/trips", tripRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "AI Travel Guide API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AI Travel Guide API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      itinerary: "/api/itinerary (POST)",
      weather: "/api/weather?city=CityName (GET)",
      trips: "/api/trips (GET)",
      seedTrips: "/api/trips/seed (GET)",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/`);
});
