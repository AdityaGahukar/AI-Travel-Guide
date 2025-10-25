import React, { useState } from "react";
import axios from "axios";

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchWeather = async () => {
    if (weather && isVisible) {
      setIsVisible(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsVisible(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather?city=${city}`
      );
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={fetchWeather}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span>🌤️</span>
        {isVisible && weather ? "Hide Weather" : "View Weather"}
      </button>

      {isVisible && (
        <div className="mt-4 p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg border border-blue-200">
          {loading && (
            <div className="text-center text-gray-600">
              <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="mt-2">Loading weather...</p>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center">
              <p>⚠️ {error}</p>
            </div>
          )}

          {weather && !loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {weather.city}, {weather.country}
                  </h3>
                  <p className="text-gray-600 capitalize">
                    {weather.description}
                  </p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather icon"
                  className="w-16 h-16"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(weather.temperature)}°C
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Feels Like</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(weather.feelsLike)}°C
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {weather.humidity}%
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {weather.windSpeed} m/s
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
