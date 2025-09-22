import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import WeatherWidget from './WeatherWidget';
import RightNavbar from './RightNavbar'; // Make sure this path is correct

const CropRecommendation = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    temperature: '',
    soilMoisture: '',
    humidity: '',
    phosphorus: '',
    airPressure: '',
    rainfall: '',
    soilPh: '',
    nitrogen: '',
  });

  const [recommendedCrop, setRecommendedCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoUsed, setAutoUsed] = useState(false);
  const [error, setError] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAutoUsed(false);
    try {
      const res = await axios.post('http://localhost:5000/api/recommend', formData);
      setRecommendedCrop(res.data.crop);
    } catch (err) {
      alert("Error analyzing manually entered data");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFetch = async () => {
    setLoading(true);
    setAutoUsed(true);
    setError(null);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // First try using the direct OpenWeather API as a fallback
            // in case the backend route is failing
            const weatherApiKey = "0fda3101ea7e13b3ae97059d812466bd";
            const directWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
            
            console.log("Fetching weather data from:", directWeatherUrl);
            
            // Use direct API first to get weather data
            const weatherResponse = await axios.get(directWeatherUrl);
            const weatherData = weatherResponse.data;
            
            console.log("Weather data received:", weatherData);
            
            // Format data for our form
            const formattedData = {
              temperature: weatherData.main.temp.toFixed(2) || '',
              humidity: weatherData.main.humidity.toFixed(2) || '',
              airPressure: weatherData.main.pressure.toFixed(2) || '',
              rainfall: weatherData.rain ? (weatherData.rain['1h'] || 0).toFixed(2) : '0.00',
              // Default soil values since they can't be fetched from weather
              soilPh: '6.50',
              nitrogen: '50',
              phosphorus: '30',
              soilMoisture: '40'
            };
            
            // Update form with weather data
            setFormData(formattedData);
            
            // Set location info
            setLocationInfo({
              name: weatherData.name || 'Current Location',
              description: weatherData.weather[0]?.description || 'Weather data retrieved'
            });
            
            // Now try to get crop recommendation from backend
            try {
              const cropResponse = await axios.post(
                'http://localhost:5000/api/recommend',
                formattedData
              );
              setRecommendedCrop(cropResponse.data.crop);
            } catch (cropError) {
              console.error("Error getting crop recommendation:", cropError);
              
              // Default to basic crop logic if backend fails
              const temp = parseFloat(formattedData.temperature);
              const humidity = parseFloat(formattedData.humidity);
              
              // Simple fallback logic
              let crop = "Wheat"; // Default
              if (temp > 25 && humidity > 70) crop = "Rice";
              else if (temp > 20 && temp < 30) crop = "Corn";
              else if (temp < 20) crop = "Potato";
              
              setRecommendedCrop(crop);
            }
            
            // Log the data we're using
            console.log("Using formatted data:", formattedData);
            
          } catch (error) {
            console.error("API Error:", error);
            if (error.response) {
              setError(`${error.response.data.error || 'Failed to get weather data'} (${error.response.status})`);
            } else if (error.request) {
              setError("No response from server. Please check your internet connection.");
            } else {
              setError("Could not connect to server. Please try again later.");
            }
          } finally {
            setLoading(false);
          }
        },
        (geoError) => {
          console.error("Geolocation error:", geoError);
          setError(`Unable to retrieve location: ${geoError.message}. Please enable location services.`);
          setLoading(false);
        },
        { timeout: 10000 } // 10 second timeout for geolocation
      );
    } catch (err) {
      console.error("General error:", err);
      setError(`Error fetching weather data: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#cde3c7] min-h-screen pt-[4.5rem] md:pt-[5rem] overflow-x-hidden relative">
      
      {/* Left Sidebar */}
      <div className="hidden md:block w-64 fixed top-[4.5rem] bottom-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 md:mr-20 px-4 py-6 w-full">
        <div className="max-w-7xl mx-auto font-['Inter']">
          <h1 className="text-3xl font-bold text-[#143a0a] mb-6">
            🌱 Crop Recommendation – FarmEasy AI
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Manual Input Form */}
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-lg">
              <h2 className="text-xl font-semibold text-[#143a0a] mb-4">Soil & Climate Parameters</h2>
              
              {locationInfo && autoUsed && (
                <div className="bg-blue-50 p-3 mb-4 rounded-lg text-sm">
                  <p className="font-medium text-blue-800">Data for: {locationInfo.name}</p>
                  <p className="text-gray-600 italic">{locationInfo.description}</p>
                </div>
              )}
              
              <form onSubmit={handleManualSubmit} className="grid grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => {
                  // Determine if this field is likely filled from weather API
                  const isWeatherField = ['temperature', 'humidity', 'airPressure', 'rainfall'].includes(key);
                  const isSoilField = ['soilPh', 'nitrogen', 'phosphorus', 'soilMoisture'].includes(key);
                  const fieldClass = autoUsed && isWeatherField ? 
                    "border-blue-200 bg-blue-50" : 
                    (autoUsed && isSoilField ? "border-yellow-200 bg-yellow-50" : "border-green-100 bg-[#f4f9f2]");
                  
                  return (
                    <div key={key}>
                      <label className="block text-[#143a0a] text-sm mb-1 capitalize">
                        {key}
                        {autoUsed && isWeatherField && (
                          <span className="text-xs text-blue-600 ml-1">(from weather)</span>
                        )}
                        {autoUsed && isSoilField && (
                          <span className="text-xs text-yellow-600 ml-1">(default)</span>
                        )}
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className={`w-full rounded-lg border p-2 ${fieldClass}`}
                        step="any"
                        placeholder={key === 'soilPh' ? '0-14' : ''}
                        disabled={loading}
                      />
                    </div>
                  );
                })}
                <button
                  type="submit"
                  className={`col-span-2 mt-4 bg-green-700 text-white rounded-lg py-3 font-medium hover:bg-green-800 transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze Manually"}
                </button>
              </form>
            </div>

            {/* Auto + Result + Info */}
            <div className="space-y-6 w-full max-w-md">
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-[#143a0a] mb-4">🌾 Analysis Result</h2>
                {recommendedCrop ? (
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-lg text-[#143a0a] mb-2">Best Crop to Grow:</p>
                    <p className="text-3xl font-bold text-green-800 mb-2">{recommendedCrop}</p>
                    {autoUsed && (
                      <div className="mt-2 py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-xs inline-block">
                        Based on live weather data
                      </div>
                    )}
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-6 rounded-lg text-center">
                    <p className="text-lg text-red-700 mb-2">Error:</p>
                    <p className="text-gray-700">{error}</p>
                    <p className="mt-2 text-sm text-gray-500">Please try again or use manual entry.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                    <p>Enter soil values manually or use live data to get recommendations</p>
                  </div>
                )}

                <button
                  onClick={handleAutoFetch}
                  className={`mt-6 w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? 
                    "Fetching Data..." : 
                    "📍 Auto-Fill & Analyze Using Location"
                  }
                </button>
                
                {autoUsed && !error && !loading && (
                  <div className="mt-3 text-xs text-center text-green-600">
                    ✓ Form values filled with location data
                  </div>
                )}
              </div>

              <WeatherWidget className="mb-6" />

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-[#143a0a] mb-4">About This Feature</h2>
                <p className="text-gray-700 mb-3">
                  Our AI-powered crop recommendation system analyzes soil conditions and climate data to suggest the most suitable crops for your farm.
                </p>
                <p className="text-gray-700">
                  For best results, provide accurate soil test values or use our automatic weather data feature, which uses your location to gather relevant climate information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Navbar */}
      <div className="hidden md:block fixed right-0 top-[4.5rem] bottom-0 z-10">
        <RightNavbar user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default CropRecommendation;
