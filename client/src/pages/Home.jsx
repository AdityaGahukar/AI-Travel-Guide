import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Perfect Trip with
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Travel Guide
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Generate personalized travel itineraries, discover amazing
            destinations, and get real-time weather information for your dream
            vacation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/itinerary"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Create Itinerary 🗺️
            </Link>
            <Link
              to="/trips"
              className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-blue-600"
            >
              Explore Destinations 🌍
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              AI-Powered Planning
            </h3>
            <p className="text-gray-600">
              Let our advanced AI create detailed, personalized itineraries
              based on your preferences, dates, and interests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🏖️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Curated Destinations
            </h3>
            <p className="text-gray-600">
              Explore our hand-picked collection of the world's most amazing
              destinations with detailed highlights and tips.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🌤️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Real-Time Weather
            </h3>
            <p className="text-gray-600">
              Check current weather conditions for any destination to help you
              pack smart and plan better.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                Choose Destination
              </h4>
              <p className="text-gray-600 text-sm">
                Tell us where you want to go
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Set Your Dates</h4>
              <p className="text-gray-600 text-sm">Pick your travel dates</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Add Interests</h4>
              <p className="text-gray-600 text-sm">Share what you love to do</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Get Itinerary</h4>
              <p className="text-gray-600 text-sm">
                Receive your personalized plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
