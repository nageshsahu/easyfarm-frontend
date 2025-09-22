import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import RightNavbar from './Components/RightNavbar';

import About from './Components/About';
import Contact from './Components/Contact';
import Services from './Components/Services';
import Blog from './Components/Blog';
import Blog1 from './Components/Blog1';
import Blog2 from './Components/Blog2';
import Blog3 from './Components/Blog3';
import Dashboard from './Components/Dashboard';
import Dashboard1 from './Components/Dashboard1';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import CropRecommendation from './Components/CropRecommendation';
import DiseaseDetectionPage from './Components/DiseaseDetectionPage';
import CropDashboard from './Components/CropDashboard';
import BlogPage from './Components/BlogPage';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const hideTopNavbarRoutes = ['/Dashboard', '/Dashboard1', '/CropRecommendation', '/DiseaseDetectionPage', '/CropDashboard'];
  const showRightNavbarRoutes = ['/CropDashboard', '/Dashboard1']; // ✅ Show right navbar only on these

  const shouldHideTopNavbar = hideTopNavbarRoutes.includes(location.pathname);
  const shouldShowRightNavbar = showRightNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/session', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token} `}
      })
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <>
      {!shouldHideTopNavbar && <Navbar user={user} setUser={setUser} />}
      {shouldShowRightNavbar && <RightNavbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blogs/page/:pagenumber" element={<Blog1 />} />
        <Route path="/blogs/page/2" element={<Blog2 />} />
        <Route path="/blogs/page/3" element={<Blog3 />} />

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard1" element={<Dashboard1 user={user} setUser={setUser} />} />
        <Route path="/DiseaseDetectionPage" element={<DiseaseDetectionPage />} />
        <Route path="/CropRecommendation" element={<CropRecommendation user={user} setUser={setUser} />} />
        <Route path="/CropDashboard" element={<CropDashboard user={user} setUser={setUser} />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/BlogPage" element={<BlogPage />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;