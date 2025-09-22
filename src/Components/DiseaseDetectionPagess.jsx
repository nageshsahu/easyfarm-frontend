import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const DiseaseDetectionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null); // Clear previous result when new image is uploaded
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/detect-disease', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Detection failed", err);
      alert("Something went wrong with the detection.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );

        const weatherData = {
          temperature: res.data.main.temp,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          location: res.data.name,
        };

        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#cde3c7] flex">
      <Sidebar />
      
      <div className="flex-1 p-8 font-['Inter']">
        <h1 className="text-3xl font-bold text-[#143a0a] mb-6">
          🌿 Crop Disease Detection – FarmEasy AI
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-semibold text-[#143a0a] mb-4">Upload Plant Image</h2>
            
            <label className="block text-gray-700 mb-2 font-medium">
              Select image of affected crop:
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="w-full mb-4 text-gray-700 cursor-pointer"
            />

            {preview && (
              <div className="my-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-60 object-cover border rounded-lg shadow-sm" 
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !image}
              className={`w-full py-3 mt-4 text-white rounded-lg font-medium transition-colors ${
                loading || !image ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? "Analyzing..." : "Analyze Disease"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 w-full shadow-lg">
              <h2 className="text-xl font-semibold text-[#143a0a] mb-4">🌤 Environmental Data</h2>
              <p className="text-gray-600 mb-4">Current weather conditions can affect plant diseases.</p>
              
              <button
                onClick={fetchWeatherData}
                className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors"
              >
                📍 Fetch Live Weather Data
              </button>

              {weather && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-gray-700">
                  <p className="font-medium text-blue-800 mb-2">{weather.location}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <p><span className="font-medium">Temperature:</span> {weather.temperature}°C</p>
                    <p><span className="font-medium">Humidity:</span> {weather.humidity}%</p>
                    <p><span className="font-medium">Pressure:</span> {weather.pressure} hPa</p>
                  </div>
                </div>
              )}
            </div>

            {result && (
              <div className="bg-white rounded-3xl p-6 w-full shadow-lg">
                <h2 className="text-xl font-semibold text-[#143a0a] mb-4">🧠 Detection Result</h2>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-xl font-bold text-green-800">{result.diseaseName}</p>
                  <p className="text-sm text-green-700">Confidence: {result.confidence}%</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-[#143a0a] mb-2">Recommended Solution:</h3>
                  <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg">{result.solution}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-[#143a0a] mb-2">About the Disease:</h3>
                  <p className="text-gray-700">{result.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetectionPage;