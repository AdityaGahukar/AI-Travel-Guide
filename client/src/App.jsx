import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import SuggestedTrips from "./pages/SuggestedTrips";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
          <Route path="/trips" element={<SuggestedTrips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
