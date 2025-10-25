// server/controllers/itineraryController.js

import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateItinerary = async (req, res) => {
  try {
    const { destination, startDate, endDate, interests } = req.body;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        error: "Please provide destination, start date, and end date",
      });
    }

    const start = new Date(startDate);
    const end   = new Date(endDate);
    const days  = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const promptText = `Create a detailed ${days}-day travel itinerary for ${destination}.
Travel dates: ${startDate} to ${endDate}
Interests: ${interests || "general tourism"}

Please provide:
- Day-by-day breakdown with activities
- Recommended places to visit
- Estimated time for each activity
- Brief descriptions of attractions
- Practical tips for travelers

Format the response as a structured day-by-day itinerary.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const itineraryText = response.text();

    return res.json({
      success: true,
      destination,
      startDate,
      endDate,
      days,
      interests,
      itinerary: itineraryText,
    });

  } catch (error) {
    console.error("Error generating itinerary:", error);
    return res.status(500).json({
      error: "Failed to generate itinerary",
      message: error.message,
    });
  }
};

export { generateItinerary };
