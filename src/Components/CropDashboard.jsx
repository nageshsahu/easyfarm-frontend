import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from './Sidebar';
import RightNavbar from './RightNavbar'; // Right side Navbar

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid      
} from "recharts";

import {
  Autocomplete, TextField, Button, CircularProgress
} from "@mui/material";

export default function CropDashboard() {
  const [crop, setCrop] = useState("");
  const [profit, setProfit] = useState(0);
  const [profitPerKg, setProfitPerKg] = useState(0);
  const [bestMonth, setBestMonth] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictionTriggered, setPredictionTriggered] = useState(false);
  const [user, setUser] = useState(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const cropOptions = [
    "Wheat", "Rice", "Tomato", "Potato", "Onion", "Mango", "Banana", "Apple",
    "Carrot", "Spinach", "Lentil", "Chickpea", "Cotton", "Corn", "Barley", "Soybean",
    "Peanut", "Mustard", "Sugarcane", "Peas", "Cabbage", "Cauliflower", "Pumpkin",
    "Cucumber", "Radish", "Garlic", "Ginger", "Pineapple", "Orange", "Lemon", "Papaya",
    "Grapes", "Pomegranate", "Guava", "Coconut", "Tea", "Coffee", "Black Pepper",
    "Cardamom", "Clove", "Turmeric", "Saffron", "Chili", "Okra", "Bitter Gourd",
    "Jackfruit", "Sweet Potato", "Brinjal", "Beetroot", "Turnip", "Watermelon",
    "Muskmelon", "Lychee", "Pear", "Apricot", "Plum", "Cashew", "Almond", "Walnut"
  ];

  const fetchCropData = async () => {
    if (!crop) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/prediction/' + crop);
      const data = res.data;

      const monthlyPrices = Array(12).fill(0);
      Object.entries(data.predicted_prices || {}).forEach(([month, price]) => {
        monthlyPrices[parseInt(month) - 1] = price;
      });

      const bestMonthIdx = (data.best_month || 1) - 1;
      const maxProfit = Math.max(...monthlyPrices);

      // Convert to INR (static rate example)
      const exchangeRate = 83.5; // 1 USD = 83.5 INR (example rate)
      const profitInINR = maxProfit * exchangeRate;
      const profitPerKgInINR = (maxProfit / 1000) * exchangeRate;

      setPrices(monthlyPrices);
      setBestMonth(months[bestMonthIdx]);
      setProfit(profitInINR);
      setProfitPerKg(profitPerKgInINR);
      setPredictionTriggered(true);
    } catch (error) {
      console.error("Error fetching crop data:", error);
      setPrices([]);
      setBestMonth("");
      setProfit(0);
      setProfitPerKg(0);
      setPredictionTriggered(false);
    } finally {
      setLoading(false);
    }
  };

  const graphData = months.map((month, idx) => ({
    month,
    price: prices[idx] || 0
  }));

  useEffect(() => {
    // Check for user session from local storage
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/session', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar on the left */}
      <aside className="w-64 bg-green-800 text-white h-screen fixed left-0 top-0 p-4 md:w-16 md:relative md:h-auto md:top-0 md:left-0">
        <Sidebar />
      </aside>

      {/* Main Content in the middle */}
      <main className="flex-1 ml-64 mr-64 p-6 overflow-auto md:ml-16 md:mr-16 md:p-4">
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-green-800 mb-2 md:text-3xl">
            Best Time to Sell Crop
          </h1>
          <p className="text-center text-gray-600 mb-8 md:text-sm">
            Analyze market trends and maximize your crop selling profits.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <Autocomplete
              disablePortal
              options={cropOptions}
              sx={{ width: 300 }}
              value={crop}
              onChange={(event, newValue) => setCrop(newValue || "")}
              renderInput={(params) => (
                <TextField {...params} label="Select Crop" variant="outlined" />
              )}
            />

            <Button
              variant="contained"
              color="success"
              onClick={fetchCropData}
              disabled={!crop || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Predict"}
            </Button>
          </div>

          {predictionTriggered && !loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <h2 className="text-lg font-semibold text-gray-700">Crop Selected</h2>
                  <p className="text-2xl font-bold text-green-700 mt-2">{crop}</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <h2 className="text-lg font-semibold text-gray-700">Estimated Profit (INR)</h2>
                  <p className="text-2xl font-bold text-green-700 mt-2">₹{profit.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">(per ton)</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <h2 className="text-lg font-semibold text-gray-700">Profit (per Kg) (INR)</h2>
                  <p className="text-2xl font-bold text-green-700 mt-2">₹{profitPerKg.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                  Recommended Time to Sell:{" "}
                  <span className="text-green-700">{bestMonth}</span>
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Right Navbar */}
      <aside className="hidden md:block w-64 bg-green-800 text-white h-screen fixed right-0 top-0 p-4">
        <RightNavbar user={user} setUser={setUser} />
      </aside>
    </div>
  );
}
