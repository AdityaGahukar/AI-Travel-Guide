// controllers/weatherController.js
import axios from "axios";

const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "Please provide a city name" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const weatherData = response.data;

    res.json({
      success: true,
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      windSpeed: weatherData.wind.speed,
    });
  } catch (error) {
    console.error("Error fetching weather:", error);

    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    res.status(500).json({
      error: "Failed to fetch weather data",
      message: error.message,
    });
  }
};

export { getWeather };
