require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!WEATHER_API_KEY) {
  console.error("ERROR: WEATHER_API_KEY is not set in .env file");
  process.exit(1);
}

if (!UNSPLASH_ACCESS_KEY) {
  console.error("ERROR: UNSPLASH_ACCESS_KEY is not set in .env file");
  process.exit(1);
}

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City query parameter required" });

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching weather data" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/unsplash', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Query parameter required" });

  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching Unsplash image" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
