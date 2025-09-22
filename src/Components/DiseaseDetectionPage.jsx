import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import RightNavbar from './RightNavbar'; // Make sure this path is correct

import * as tf from '@tensorflow/tfjs';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Vite
        // const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // CRA


const DiseaseDetectionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [weather, setWeather] = useState(null);
  const [model, setModel] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightNavbarOpen, setRightNavbarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);

  
  const labels = [
    "Apple_Apple_scab",
    "Apple_Black_rot",
    "Apple_Cedar_apple_rust",
    "Apple_healthy",
    "Blueberry_healthy",
    "Cherry(including_sour)Powdery_mildew",
    "Cherry(including_sour)healthy",
    "Corn(maize)Cercospora_leaf_spot Gray_leaf_spot",
    "Corn(maize)Common_rust",
    "Corn(maize)Northern_Leaf_Blight",
    "Corn(maize)_healthy",
    "Grape_Black_rot",
    "Grape_Leaf_blight(Isariopsis_Leaf_Spot)",
    "Grape__Esca(Black_Measles)",
    "Grape_healthy",
    "Orange_Haunglongbing(Citrus_greening)",
    "Peach_Bacterial_spot",
    "Peach_healthy",
    "Pepper,_bell_Bacterial_spot",
    "Pepper,_bell_healthy",
    "Potato_Early_blight",
    "Potato_Late_blight",
    "Potato_healthy",
    "Raspberry__healthy",
    "Soybean__healthy",
    "Squash_Powdery_mildew",
    "Strawberry_Leaf_scorch",
    "Strawberry_healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites Two-spotted_spider_mite",
    "Tomato_Target_Spot",
    "Tomato_Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato_Tomato_mosaic_virus",
    "Tomato_healthy"
  ];

  

  const diseaseData = {
    "Apple_Apple_scab": {
      description: "Apple scab creates olive-green or brown spots on leaves and fruit.",
      solution: "Apply fungicides in early spring and remove fallen leaves in autumn."
    },
    "Apple_Black_rot": {
      description: "Black rot causes fruit rot and dark cankers on apple tree branches.",
      solution: "Prune out infected limbs. Apply fungicide sprays during the growing season."
    },
    "Apple_Cedar_apple_rust": {
      description: "This disease causes orange leaf spots and affects both apple and cedar trees.",
      solution: "Remove nearby cedar hosts. Use fungicides like myclobutanil in spring."
    },
    "Apple_healthy": {
      description: "The apple tree appears strong and unaffected by pests or diseases.",
      solution: "Continue pruning, fertilizing, and monitoring throughout the growing season."
    },
    "Blueberry_healthy": {
      description: "Your blueberry plant appears vigorous and disease-free.",
      solution: "Ensure acidic soil conditions and maintain regular watering and pruning."
    },
    "Cherry(including_sour)Powdery_mildew": {
      description: "Powdery mildew creates a white powdery coating on cherry leaves.",
      solution: "Apply fungicides like myclobutanil. Prune to improve air circulation."
    },
    "Cherry(including_sour)healthy": {
      description: "This cherry plant is in great health with no signs of disease.",
      solution: "Maintain good pruning and monitor for fungal issues after rainfall."
    },
    "Corn(maize)Cercospora_leaf_spot Gray_leaf_spot": {
      description: "Gray leaf spot creates rectangular lesions on corn, reducing photosynthesis and yield.",
      solution: "Use resistant varieties and apply fungicide when disease risk is high."
    },
    "Corn(maize)Common_rust": {
      description: "Common rust causes reddish-brown pustules on corn leaves.",
      solution: "Use resistant hybrids and apply fungicides if needed during early stages."
    },
    "Corn(maize)Northern_Leaf_Blight": {
      description: "Northern Leaf Blight causes long, gray-green lesions on corn leaves, lowering yield.",
      solution: "Use resistant hybrids and apply fungicides if disease pressure is high."
    },
    "Corn(maize)_healthy": {
      description: "This corn plant is strong and free from signs of disease.",
      solution: "Water regularly, fertilize well, and scout for pests like borers or aphids."
    },
    "Grape_Black_rot": {
      description: "Black rot causes black lesions on grape leaves and fruit.",
      solution: "Apply fungicides early in the season and remove mummified fruit."
    },
    "Grape_Leaf_blight(Isariopsis_Leaf_Spot)": {
      description: "This disease causes brown lesions with dark margins on grape leaves.",
      solution: "Prune infected leaves and apply fungicides like mancozeb or captan."
    },
    "Grape__Esca(Black_Measles)": {
      description: "Esca leads to striped or scorched leaves and rotting grapes.",
      solution: "Remove and burn infected vines. Use trunk sprays in early stages."
    },
    "Grape_healthy": {
      description: "This grapevine shows no signs of disease or pest damage.",
      solution: "Maintain good airflow, prune regularly, and check for signs of mildew or rot."
    },
    "Orange_Haunglongbing(Citrus_greening)": {
      description: "Citrus greening is a bacterial disease causing yellow shoots, misshapen fruit, and tree decline.",
      solution: "There is no cure. Remove and destroy infected trees. Control psyllid insects using insecticides."
    },
    "Peach_Bacterial_spot": {
      description: "Bacterial spot causes dark, sunken lesions on peach leaves and fruit.",
      solution: "Apply copper-based sprays early in the season. Avoid wetting foliage."
    },
    "Peach_healthy": {
      description: "This peach tree is thriving without signs of infection or stress.",
      solution: "Continue regular pruning, watering, and monitoring for pests."
    },
    "Pepper,_bell_Bacterial_spot": {
      description: "Bacterial spot shows as water-soaked lesions on leaves and fruit.",
      solution: "Use copper-based sprays and avoid working with wet plants to prevent spread."
    },
    "Pepper,_bell_healthy": {
      description: "The bell pepper plant looks healthy with no visible issues.",
      solution: "Provide balanced nutrients and keep monitoring for pests like aphids or mites."
    },
    "Potato_Early_blight": {
      description: "Early blight produces brown leaf spots and can reduce tuber development.",
      solution: "Rotate crops, remove debris, and spray with chlorothalonil or mancozeb."
    },
    "Potato_Late_blight": {
      description: "Late blight causes dark, water-soaked patches on leaves and tubers.",
      solution: "Destroy infected plants and apply systemic fungicides like metalaxyl."
    },
    "Potato_healthy": {
      description: "The potato plant is in good condition and shows no disease indicators.",
      solution: "Ensure proper soil drainage and avoid waterlogging to maintain health."
    },
    "Raspberry__healthy": {
      description: "Your raspberry plant looks robust and disease-free.",
      solution: "Regularly prune and provide adequate sunlight for strong fruiting."
    },
    "Soybean__healthy": {
      description: "Your soybean crop looks healthy and free of disease symptoms.",
      solution: "Keep fields weed-free and scout regularly to catch early signs of pests or pathogens."
    },
    "Squash_Powdery_mildew": {
      description: "Powdery mildew causes white, powdery spots on squash leaves, reducing photosynthesis.",
      solution: "Apply sulfur-based or potassium bicarbonate fungicides. Increase air circulation by spacing plants."
    },
    "Strawberry_Leaf_scorch": {
      description: "Leaf scorch causes browning and curling of strawberry leaves due to fungal infection.",
      solution: "Use certified disease-free plants. Apply fungicides and remove infected foliage."
    },
    "Strawberry_healthy": {
      description: "The strawberry plant looks fresh and free of diseases.",
      solution: "Mulch, fertilize appropriately, and monitor regularly for pests or mildew."
    },
    "Tomato_Bacterial_spot": {
      description: "Bacterial spot causes water-soaked lesions on tomato leaves and fruit.",
      solution: "Avoid overhead irrigation. Use copper sprays and disease-free seeds."
    },
    "Tomato_Early_blight": {
      description: "Early blight produces dark concentric rings on leaves and fruit drop.",
      solution: "Remove infected leaves, rotate crops, and use fungicides such as copper-based sprays."
    },
    "Tomato_Late_blight": {
      description: "Late blight is a devastating fungal disease that causes large, dark, greasy lesions on leaves and fruit.",
      solution: "Remove infected plants immediately. Apply fungicides like chlorothalonil or mancozeb. Avoid overhead watering."
    },
    "Tomato_Leaf_Mold": {
      description: "Leaf mold appears as yellow patches on upper leaves with olive mold below.",
      solution: "Improve airflow and apply copper-based fungicides if needed."
    },
    "Tomato_Septoria_leaf_spot": {
      description: "Septoria leaf spot causes small, round leaf spots with dark borders and tan centers.",
      solution: "Remove infected foliage and apply fungicides like chlorothalonil or copper hydroxide."
    },
    "Tomato_Spider_mites Two-spotted_spider_mite": {
      description: "Spider mites cause stippling and webbing on tomato leaves.",
      solution: "Spray with insecticidal soap or neem oil. Keep humidity high to deter them."
    },
    "Tomato_Target_Spot": {
      description: "Target spot leads to circular brown spots with concentric rings on tomato leaves.",
      solution: "Use resistant varieties and apply preventive fungicides."
    },
    "Tomato_Tomato_Yellow_Leaf_Curl_Virus": {
      description: "This virus causes curled, yellowing leaves and stunted tomato growth.",
      solution: "Control whitefly vectors. Use resistant varieties. Remove infected plants promptly."
    },
    "Tomato_Tomato_mosaic_virus": {
      description: "This virus causes mottled and deformed tomato leaves and fruit.",
      solution: "Remove infected plants and avoid handling healthy plants after touching infected ones."
    },
    "Tomato_healthy": {
      description: "Your tomato plant appears to be healthy with no visible signs of disease.",
      solution: "Continue regular care, watering, and monitoring for any early signs of disease."
    }
  };
  
  

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadGraphModel('/model/model.json');
      setModel(loadedModel);
      console.log('Model loaded');
    };
    loadModel();
  }, []);

  useEffect(() => {
    // Check for user session from local storage
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${BACKEND_URL}/api/auth/session`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image || !model) return;

    setLoading(true);
    setResult(null);

    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = async () => {
      const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([256, 256])
        .toFloat()
        .div(255.0)
        .expandDims();

      const predictions = await model.predict(tensor).data();
      const maxIndex = predictions.indexOf(Math.max(...predictions));
      const confidence = (predictions[maxIndex] * 100).toFixed(2);

      const label = labels[maxIndex];
      const diseaseInfo = diseaseData[label];

      setResult({
        diseaseName: label,
        confidence,
        solution: diseaseInfo.solution,
        description: diseaseInfo.description
      });

      setLoading(false);
    };
  };

  const fetchWeatherData = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Vite
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
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
    <div className="min-h-screen bg-100 grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl font-bold">☰</button>
        <h1 className="text-xl font-bold text-green-700">FarmEasy AI</h1>
        <button onClick={() => setRightNavbarOpen(!rightNavbarOpen)} className="text-xl font-bold">≡</button>
      </div>

      {/* Sidebar */}
      {(sidebarOpen || windowWidth >= 768) && (
        <aside className="md:col-span-2 bg-white shadow-md h-full z-10 md:z-auto">
          <Sidebar />
        </aside>
      )}

      {/* Main Content */}
      <main className="md:col-span-8 bg-white shadow-md rounded p-5">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">
          🌿 Crop Disease Detection - FarmEasy AI
        </h1>

        {/* Image Upload */}
        <div className="shadow-md rounded p-6 bg-white mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Upload Image of Affected Crop:
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />

          {preview && (
            <div className="my-4">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img src={preview} alt="Preview" className="w-60 h-60 object-cover border rounded" />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !image}
            className={`w-full py-2 text-white rounded mb-4 ${
              loading || !image ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Disease"}
          </button>
        </div>

        {/* Weather Data */}
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🌤️ Environmental Conditions</h2>
          <button
            onClick={fetchWeatherData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📍 Fetch Live Weather Data
          </button>

          {weather && (
            <div className="mt-4 text-gray-800">
              <p><strong>Location:</strong> {weather.location}</p>
              <p><strong>Temperature:</strong> {weather.temperature} °C</p>
              <p><strong>Humidity:</strong> {weather.humidity} %</p>
              <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🧠 Detection Result</h2>
            <p><strong>Disease Name:</strong> {result.diseaseName}</p>
            <p><strong>Confidence:</strong> {result.confidence}%</p>
            <p><strong>Solution:</strong> {result.solution}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-1">More About the Disease:</h3>
              <p className="text-gray-700">{result.description}</p>
            </div>
          </div>
        )}
      </main>

      {/* Right Navbar */}
      {(rightNavbarOpen || windowWidth >= 768) && (
        <aside className={`md:col-span-2 bg-white shadow-md h-full z-10 md:z-auto ${rightNavbarOpen && windowWidth < 768 ? 'absolute right-0 top-0 w-64 h-screen bg-white' : ''}`}>
          <RightNavbar user={user} setUser={setUser} />
        </aside>
      )}
    </div>
  );
};

export default DiseaseDetectionPage;