// controllers/tripController.js
import Trip from "../models/Trip.js";

// Get all suggested trips
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      error: "Failed to fetch trips",
      message: error.message,
    });
  }
};

// Get single trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({
      error: "Failed to fetch trip",
      message: error.message,
    });
  }
};

// Seed initial trips (for development)
const seedTrips = async (req, res) => {
  try {
    // Clear existing trips
    await Trip.deleteMany({});

    const trips = [
      {
        destination: "Paris, France",
        title: "Romantic Paris Getaway",
        description:
          "Experience the City of Light with its iconic landmarks, world-class cuisine, and romantic atmosphere.",
        highlights: [
          "Eiffel Tower",
          "Louvre Museum",
          "Notre-Dame Cathedral",
          "Seine River Cruise",
          "Montmartre",
        ],
        bestTimeToVisit: "April to June, September to October",
        imageUrl:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      },
      {
        destination: "Tokyo, Japan",
        title: "Modern Tokyo Adventure",
        description:
          "Discover the perfect blend of ancient tradition and cutting-edge technology in Japan's vibrant capital.",
        highlights: [
          "Senso-ji Temple",
          "Tokyo Skytree",
          "Shibuya Crossing",
          "Tsukiji Market",
          "Mount Fuji Day Trip",
        ],
        bestTimeToVisit: "March to May, September to November",
        imageUrl:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      },
      {
        destination: "Bali, Indonesia",
        title: "Tropical Bali Paradise",
        description:
          "Relax on pristine beaches, explore ancient temples, and immerse yourself in Balinese culture.",
        highlights: [
          "Tanah Lot Temple",
          "Ubud Rice Terraces",
          "Sacred Monkey Forest",
          "Beach Clubs",
          "Traditional Dance",
        ],
        bestTimeToVisit: "April to October",
        imageUrl:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      },
      {
        destination: "New York City, USA",
        title: "The Big Apple Experience",
        description:
          "Explore the city that never sleeps with its iconic skyline, world-famous attractions, and diverse culture.",
        highlights: [
          "Statue of Liberty",
          "Central Park",
          "Times Square",
          "Brooklyn Bridge",
          "Broadway Shows",
        ],
        bestTimeToVisit: "April to June, September to November",
        imageUrl:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
      },
      {
        destination: "Santorini, Greece",
        title: "Greek Island Magic",
        description:
          "Experience breathtaking sunsets, white-washed buildings, and crystal-clear Mediterranean waters.",
        highlights: [
          "Oia Sunset",
          "Red Beach",
          "Ancient Akrotiri",
          "Wine Tasting",
          "Caldera Views",
        ],
        bestTimeToVisit: "April to November",
        imageUrl:
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      },
      {
        destination: "Dubai, UAE",
        title: "Luxury Dubai Escape",
        description:
          "Marvel at futuristic architecture, luxury shopping, and desert adventures in this Middle Eastern gem.",
        highlights: [
          "Burj Khalifa",
          "Dubai Mall",
          "Palm Jumeirah",
          "Desert Safari",
          "Dubai Marina",
        ],
        bestTimeToVisit: "November to March",
        imageUrl:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      },
    ];

    const createdTrips = await Trip.insertMany(trips);

    res.json({
      success: true,
      message: "Trips seeded successfully",
      count: createdTrips.length,
      trips: createdTrips,
    });
  } catch (error) {
    console.error("Error seeding trips:", error);
    res.status(500).json({
      error: "Failed to seed trips",
      message: error.message,
    });
  }
};

export { getAllTrips, getTripById, seedTrips };
