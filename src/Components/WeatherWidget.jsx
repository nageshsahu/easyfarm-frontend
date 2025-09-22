import React, { useState } from 'react';
import axios from 'axios';

const WeatherWidget = ({ className }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const apiKey = "0fda3101ea7e13b3ae97059d812466bd";
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        const weatherData = {
          temperature: res.data.main.temp,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          location: res.data.name,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
        };

        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }, (geoError) => {
      setError("Unable to retrieve location. Please enable location services.");
      setLoading(false);
    });
  };

  return (
    <div className={`bg-white rounded-3xl p-6 w-full shadow-lg ${className}`}>
      <h2 className="text-xl font-semibold text-[#143a0a] mb-4">🌤 Weather Conditions</h2>
      <p className="text-gray-600 mb-4">Current weather can affect your farming decisions.</p>
      
      <button
        onClick={fetchWeatherData}
        disabled={loading}
        className={`w-full py-3 text-white rounded-lg font-medium transition-colors ${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Fetching..." : "📍 Fetch Live Weather Data"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {weather && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg text-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-blue-800">{weather.location}</p>
            {weather.icon && (
              <img 
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                alt={weather.description}
                className="w-12 h-12"
              />
            )}
          </div>
          <p className="mb-2 capitalize">{weather.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <p><span className="font-medium">Temperature:</span> {weather.temperature}°C</p>
            <p><span className="font-medium">Humidity:</span> {weather.humidity}%</p>
            <p><span className="font-medium">Pressure:</span> {weather.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget; 