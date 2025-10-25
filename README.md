# 🌍 AI Travel Guide – Personalized Tour Planner

A full-stack web application that uses AI (Gemini API) to generate personalized travel itineraries and display suggested trips with real-time weather information.

## ✨ Features

- **🤖 AI-Powered Itinerary Generation**: Uses Google's Gemini API to create personalized, detailed travel itineraries based on destination, dates, and interests
- **🏖️ Suggested Trips**: Browse curated travel destinations with highlights and best times to visit
- **🌤️ Real-Time Weather**: Check current weather conditions for any destination using OpenWeatherMap API
- **📱 Responsive Design**: Beautiful, modern UI built with React and Tailwind CSS
- **💾 MongoDB Integration**: Store and retrieve trip data efficiently

## 🧰 Tech Stack

### Frontend

- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP requests

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Google Generative AI (Gemini)** - AI itinerary generation
- **OpenWeatherMap API** - Weather data

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas account)
- **npm** or **yarn**

You'll also need API keys for:

- **Gemini API**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **OpenWeatherMap API**: Get from [OpenWeatherMap](https://openweathermap.org/api)

## 🚀 Installation & Setup

### 1. Clone or Navigate to Project Directory

```bash
cd ai-travel-guide
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API keys
# GEMINI_API_KEY=your_actual_gemini_api_key
# OPENWEATHER_API_KEY=your_actual_openweather_api_key
# MONGO_URI=mongodb://localhost:27017/ai-travel-guide
# PORT=5000
```

**Important**: Make sure MongoDB is running locally, or use MongoDB Atlas connection string.

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

## 🏃 Running the Application

You need to run both the backend and frontend servers simultaneously.

### Terminal 1 - Start Backend Server

```bash
cd server
npm start
```

The backend will run on `http://localhost:5000`

### Terminal 2 - Start Frontend Server

```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## 📁 Project Structure

```
ai-travel-guide/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── WeatherWidget.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ItineraryBuilder.jsx
│   │   │   └── SuggestedTrips.jsx
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                  # Node.js backend
│   ├── controllers/
│   │   ├── itineraryController.js
│   │   ├── weatherController.js
│   │   └── tripController.js
│   ├── models/
│   │   └── Trip.js
│   ├── routes/
│   │   ├── itineraryRoutes.js
│   │   ├── weatherRoutes.js
│   │   └── tripRoutes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .env.example
└── README.md
```

## 🔑 API Endpoints

### Backend API Routes

- `GET /` - API information
- `GET /api/health` - Health check

#### Itinerary

- `POST /api/itinerary` - Generate AI-powered itinerary
  - Body: `{ destination, startDate, endDate, interests }`

#### Weather

- `GET /api/weather?city=Paris` - Get weather for a city

#### Trips

- `GET /api/trips` - Get all suggested trips
- `GET /api/trips/seed` - Seed initial trip data (run once)
- `GET /api/trips/:id` - Get single trip by ID

## 🎯 Usage Guide

### 1. Seed Initial Data (First Time Only)

After starting the backend, visit:

```
http://localhost:5000/api/trips/seed
```

This will populate the database with sample trip destinations.

### 2. Create an Itinerary

1. Navigate to **Plan Trip** page
2. Enter your destination (e.g., "Paris, France")
3. Select start and end dates
4. Add your interests (optional)
5. Click **Generate Itinerary**
6. View your AI-generated personalized travel plan

### 3. Explore Suggested Trips

1. Navigate to **Suggested Trips** page
2. Browse curated destinations
3. Click **View Weather** on any card to see current weather

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_key
MONGO_URI=mongodb://localhost:27017/ai-travel-guide
```

