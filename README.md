
# Weather App Backend Server

This is the backend server for the Weather App. It acts as a proxy between the frontend and external APIs to keep API keys secure.

## Features

- Fetches weather data from WeatherAPI based on city query
- Fetches random weather-related images from Unsplash
- Hides API keys from frontend by handling requests server-side
- CORS enabled for frontend access

## Requirements

- Node.js
- npm
- Environment variables for API keys (`.env` file)

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root with the following content:

```
WEATHER_API_KEY=your_weather_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

4. Start the server using:

```
node server.js
```

The server will run on port 3000 by default or the port specified in your environment variables.

## API Endpoints

- `GET /weather?city={city_name}`  
  Returns weather data for the specified city.

- `GET /unsplash?query={search_query}`  
  Returns a random image from Unsplash related to the search query.

## Notes

- Make sure your `.env` file is included in `.gitignore` to prevent API keys from being pushed to public repositories.
- The frontend should make requests to this backend to fetch data securely.

## License

MIT License
