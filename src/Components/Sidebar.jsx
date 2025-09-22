// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/Dashboard1', icon: '🏠', label: 'Dashboard' },
    { path: '/CropRecommendation', icon: '🌱', label: 'Crop Recommendation' },
    { path: '/DiseaseDetectionPage', icon: '🔍', label: 'Disease Detection' },
    { path: '/Services', icon: '🛠️', label: 'Services' },
    { path: '/CropDashboard', icon: '📊', label: 'Price Analysis' },
    { path: '/', icon: '🏡', label: 'Home' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-green-700 p-2 rounded-full focus:outline-none shadow-lg"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white p-4 pt-20 md:pt-8 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">EasyFarm</h2>
          <p className="text-green-300 text-sm">AI Farm Management</p>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors ${
                    location.pathname === item.path ? 'bg-green-700 font-medium' : ''
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support section (only desktop) */}
        <div className="mt-auto pt-8 hidden md:block">
          <div className="bg-green-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-green-200 mb-3">
              Contact our support team for assistance with any issues.
            </p>
            <Link
              to="/Contact"
              className="bg-green-600 text-white text-sm px-3 py-2 rounded inline-block hover:bg-green-500"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
