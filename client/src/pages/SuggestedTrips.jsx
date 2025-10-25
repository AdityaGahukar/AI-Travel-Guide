import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherWidget from "../components/WeatherWidget";

const SuggestedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/trips");

      if (response.data.trips.length === 0) {
        // If no trips, seed them first
        await axios.get("http://localhost:5000/api/trips/seed");
        const seededResponse = await axios.get(
          "http://localhost:5000/api/trips"
        );
        setTrips(seededResponse.data.trips);
      } else {
        setTrips(response.data.trips);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading amazing destinations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800 text-lg">
                Error Loading Trips
              </h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchTrips}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Suggested Trips
        </h1>
        <p className="text-xl text-gray-600">
          Explore our curated collection of amazing destinations around the
          world
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={trip.imageUrl}
                alt={trip.destination}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=Travel+Destination";
                }}
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                📍 {trip.destination.split(",")[0]}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {trip.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {trip.description}
              </p>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>✨</span>
                  Highlights
                </h3>
                <ul className="space-y-1">
                  {trip.highlights.slice(0, 4).map((highlight, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span>🗓️</span>
                  Best Time to Visit
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {trip.bestTimeToVisit}
                </p>
              </div>

              <WeatherWidget city={trip.destination.split(",")[0]} />
            </div>
          </div>
        ))}
      </div>

      {trips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No trips available yet.</p>
        </div>
      )}
    </div>
  );
};

export default SuggestedTrips;
