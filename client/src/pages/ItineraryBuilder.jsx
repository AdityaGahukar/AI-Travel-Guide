import React, { useState } from "react";
import axios from "axios";

const ItineraryBuilder = () => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    interests: "",
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/itinerary",
        formData
      );
      setItinerary(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };

  const formatItinerary = (text) => {
    // Split by lines and create formatted output
    return text.split("\n").map((line, index) => {
      // Check if line is a day header (e.g., "Day 1:", "**Day 1**")
      if (line.match(/^\*?\*?Day \d+/i) || line.match(/^#{1,3}\s*Day \d+/i)) {
        return (
          <h3
            key={index}
            className="text-2xl font-bold text-blue-600 mt-6 mb-3"
          >
            {line.replace(/[*#]/g, "").trim()}
          </h3>
        );
      }
      // Check if line is a header (starts with ## or **)
      else if (line.match(/^#{2,3}\s/) || line.match(/^\*\*.+\*\*$/)) {
        return (
          <h4
            key={index}
            className="text-xl font-semibold text-gray-800 mt-4 mb-2"
          >
            {line.replace(/[*#]/g, "").trim()}
          </h4>
        );
      }
      // Check if line is a list item
      else if (line.match(/^[-*]\s/) || line.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="ml-6 text-gray-700 mb-1">
            {line.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      // Regular paragraph
      else if (line.trim()) {
        return (
          <p key={index} className="text-gray-700 mb-3 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Build Your Perfect Itinerary
        </h1>
        <p className="text-xl text-gray-600">
          Tell us your travel plans and let AI create a personalized itinerary
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Destination *
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              placeholder="e.g., Paris, France"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="interests"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Interests (Optional)
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g., history, food, adventure, culture, museums"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple interests with commas
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin inline-block w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
                Generating Your Itinerary...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Itinerary
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Itinerary Results */}
      {itinerary && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Personalized Itinerary
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="font-semibold">{itinerary.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>
                  {itinerary.startDate} to {itinerary.endDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{itinerary.days} days</span>
              </div>
              {itinerary.interests && (
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <span>{itinerary.interests}</span>
                </div>
              )}
            </div>
          </div>

          <div className="prose max-w-none">
            {formatItinerary(itinerary.itinerary)}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              🖨️ Print Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;
