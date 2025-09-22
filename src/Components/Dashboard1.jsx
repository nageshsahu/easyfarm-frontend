import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "./Sidebar";
import RightNavbar from "./RightNavbar";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Map click handler
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}

const statesAndDistricts = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  UttarPradesh: ["Lucknow", "Kanpur", "Varanasi"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
};

// Empty initial data structure for user who hasn't added any data yet
const emptyCropData = [
  { name: "Wheat", value: 0 },
  { name: "Barley", value: 0 },
  { name: "Corn", value: 0 },
  { name: "Paddy", value: 0 },
  { name: "Coffee", value: 0 },
  { name: "Cashew", value: 0 },
];

const emptyMonthlyData = [
  { month: "Jan", cost: 0 },
  { month: "Feb", cost: 0 },
  { month: "Mar", cost: 0 },
  { month: "Apr", cost: 0 },
  { month: "May", cost: 0 },
  { month: "Jun", cost: 0 },
  { month: "Jul", cost: 0 },
  { month: "Aug", cost: 0 },
  { month: "Sep", cost: 0 },
  { month: "Oct", cost: 0 },
  { month: "Nov", cost: 0 },
  { month: "Dec", cost: 0 },
];

// Example crop data for active users
const sampleCropData = [
  { name: "Wheat", value: 31456 },
  { name: "Barley", value: 25333 },
  { name: "Corn", value: 16227 },
  { name: "Paddy", value: 15893 },
  { name: "Coffee", value: 8347 },
  { name: "Cashew", value: 1354 },
];

// Example cost data for active users
const sampleCostData = [
  { month: "Jan", cost: 200 },
  { month: "Feb", cost: 300 },
  { month: "Mar", cost: 250 },
  { month: "Apr", cost: 350 },
  { month: "May", cost: 400 },
  { month: "Jun", cost: 276 },
  { month: "Jul", cost: 390 },
  { month: "Aug", cost: 310 },
  { month: "Sep", cost: 450 },
  { month: "Oct", cost: 380 },
  { month: "Nov", cost: 320 },
  { month: "Dec", cost: 410 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6361", "#8884D8"];

function Dashboard1({ user: propUser, setUser: propSetUser }) {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState([20.5937, 78.9629]);
  const [fieldPoints, setFieldPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = useRef(null);
  
  // Local state for user if not provided as props
  const [localUser, setLocalUser] = useState(null);
  
  // Use either prop values or local state
  const user = propUser || localUser;
  const setUser = propSetUser || setLocalUser;
  
  // Chart data state
  const [cropData, setCropData] = useState(emptyCropData);
  const [costData, setCostData] = useState(emptyMonthlyData);
  const [hasActivity, setHasActivity] = useState(false);
  const [fieldCount, setFieldCount] = useState(0);
  
  // Fetch user session if needed
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && !propUser) {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/session`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          });
          setLocalUser(response.data.user || null);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        localStorage.removeItem('token');
        setLocalUser(null);
      }
    };
    
    fetchUserData();
  }, [propUser]);

  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    setFieldPoints((prev) => [...prev, [lat, lng]]);
  }, []);

  const finalizeField = () => {
    if (fieldPoints.length > 2) {
      // Create a new polygon and update state
      setPolygons((prev) => [...prev, fieldPoints]);
      setFieldPoints([]);
      
      // Add analytics event notification
      const analyticsNotification = document.createElement('div');
      analyticsNotification.className = 'fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded shadow-lg z-50 animate-pulse';
      analyticsNotification.innerHTML = 'Field data added to analytics';
      document.body.appendChild(analyticsNotification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        analyticsNotification.remove();
      }, 3000);
    } else {
      alert("Please select at least three points to define a field.");
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setDistrict("");
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleGoButtonClick = () => {
    const districtLocation = {
      Mumbai: [19.076, 72.8777],
      Pune: [18.5204, 73.8567],
      Nagpur: [21.1458, 79.0882],
      Bengaluru: [12.9716, 77.5946],
      Mysuru: [12.2958, 76.6394],
      Hubli: [15.3647, 75.1239],
      Chennai: [13.0827, 80.2707],
      Coimbatore: [11.0168, 76.9558],
      Madurai: [9.9252, 78.1198],
      Lucknow: [26.8467, 80.9462],
      Kanpur: [26.4499, 80.3319],
      Varanasi: [25.3176, 82.9739],
      Jaipur: [26.9124, 75.7873],
      Udaipur: [24.5854, 73.7125],
      Jodhpur: [26.2389, 73.0248],
    };

    const locationCoordinates = districtLocation[district];
    if (locationCoordinates) {
      setLocation(locationCoordinates);
      if (mapRef.current) {
        mapRef.current.flyTo(locationCoordinates, 12);
      }
    } else {
      alert("Invalid district selected.");
    }
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          setUserLocation([latitude, longitude]);
          setLoading(false);
        },
        () => {
          alert("Failed to retrieve current location.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  // Simulate data loading based on user activity
  useEffect(() => {
    // Check if user has created any fields (polygons)
    if (polygons.length > 0 && !hasActivity) {
      setHasActivity(true);
      
      // Simulate data loading with delay to show progression
      const timer = setTimeout(() => {
        // Start with small values
        const initialCropData = emptyCropData.map(crop => ({
          ...crop,
          value: Math.floor(Math.random() * 100)
        }));
        setCropData(initialCropData);
        
        const initialCostData = emptyMonthlyData.map(month => ({
          ...month,
          cost: Math.floor(Math.random() * 50)
        }));
        setCostData(initialCostData);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Update data as more fields are added
    if (polygons.length > fieldCount) {
      setFieldCount(polygons.length);
      
      // Create growth factor based on field count
      const growthFactor = polygons.length * 0.5;
      
      // Update crop data with increasing values
      setCropData(prev => {
        return prev.map(crop => ({
          ...crop,
          value: crop.value + Math.floor(Math.random() * 5000 * growthFactor)
        }));
      });
      
      // Update cost data with increasing values
      setCostData(prev => {
        return prev.map(month => ({
          ...month,
          cost: month.cost + Math.floor(Math.random() * 50 * growthFactor)
        }));
      });
    }
  }, [polygons.length, hasActivity, fieldCount]);

  // Simulate loading of full data after certain activity threshold
  useEffect(() => {
    if (polygons.length >= 3) {
      // After 3 field polygons, load full sample data
      setCropData(sampleCropData);
      setCostData(sampleCostData);
    }
  }, [polygons.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="text-xl text-green-800 font-semibold">Loading your location...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:top-[4.5rem] md:block`}
      >
        <Sidebar />
      </div>

      {/* Right Navbar */}
      <div className="hidden md:block w-64 fixed top-[4.5rem] bottom-0 right-0 z-10 bg-white shadow-md">
        <RightNavbar user={user} setUser={setUser} />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 md:mr-64 px-4 pt-4 pb-8 w-full max-w-[calc(100%-16rem)] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">Dashboard Overview</div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md">+ New Field</button>
        </div>

        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-4">
          <select
            className="p-2 border border-gray-300 rounded"
            value={state}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {Object.keys(statesAndDistricts).map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>

          <select
            className="p-2 border border-gray-300 rounded"
            value={district}
            onChange={handleDistrictChange}
            disabled={!state}
          >
            <option value="">Select District</option>
            {state &&
              statesAndDistricts[state].map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleGoButtonClick}>
            Go
          </button>
        </div>

        {/* Map */}
        <div className="mb-4">
          <MapContainer
            center={location}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler onMapClick={handleMapClick} />

            {userLocation && (
              <Marker position={userLocation} icon={customIcon}>
                <Popup>Your Current Location</Popup>
              </Marker>
            )}

            {polygons.map((polygon, index) => (
              <Polygon key={`polygon-${index}`} positions={polygon} pathOptions={{ color: "green" }} />
            ))}

            {fieldPoints.length > 0 && (
              <Polygon positions={fieldPoints} pathOptions={{ color: "blue", dashArray: "5, 5" }} />
            )}
          </MapContainer>
        </div>

        {/* Finalize Button */}
        <div className="flex justify-between p-4">
          <button onClick={finalizeField} className="bg-green-600 text-white px-4 py-2 rounded">
            Finalize Field
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Crop Distribution</h3>
            {!hasActivity && polygons.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[250px] text-gray-500">
                <p>No crop data available yet.</p>
                <p className="text-sm mt-2">Add fields to see crop analytics.</p>
              </div>
            ) : (
              <PieChart width={400} height={250}>
                <Pie
                  data={cropData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => value > 0 ? `${name}: ${value}` : ""}
                >
                  {cropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            )}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Cost Analysis</h3>
            {!hasActivity && polygons.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[250px] text-gray-500">
                <p>No cost data available yet.</p>
                <p className="text-sm mt-2">Add fields to see cost analytics.</p>
              </div>
            ) : (
              <LineChart
                width={400}
                height={250}
                data={costData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Line type="monotone" dataKey="cost" stroke="#8884d8" />
              </LineChart>
            )}
          </div>
        </div>
        
        {/* Activity Summary - shown only when user has activity */}
        {hasActivity && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2 text-green-800">Farm Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500">Fields Created</p>
                <p className="text-2xl font-bold text-green-700">{polygons.length}</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500">Total Area</p>
                <p className="text-2xl font-bold text-green-700">
                  {(polygons.length * 2.5).toFixed(1)} hectares
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500">Est. Annual Yield</p>
                <p className="text-2xl font-bold text-green-700">
                  {(cropData.reduce((sum, crop) => sum + crop.value, 0) / 1000).toFixed(1)} tons
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard1;