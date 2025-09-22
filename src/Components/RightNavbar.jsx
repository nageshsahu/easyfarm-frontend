import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaConciergeBell,
  FaBlog,
  FaEnvelope,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

const RightNavbar = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/session", {
          withCredentials: true,
        });
        setUser(response.data.user || null);
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Right Hamburger Button (Mobile/Tablet) */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="bg-white text-green-700 p-2 rounded-full shadow-lg"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Right Navbar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-200 z-40 transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:w-20 md:flex md:flex-col md:justify-between md:py-6 md:px-4`}
      >
        <nav className="flex flex-col items-center space-y-10 text-xl text-gray-700 mt-16 md:mt-0">
          <Link to="/" onClick={closeMenu} className="hover:text-green-600" title="Home"><FaHome /></Link>
          <Link to="/About" onClick={closeMenu} className="hover:text-green-600" title="About"><FaInfoCircle /></Link>
          <Link to="/Services" onClick={closeMenu} className="hover:text-green-600" title="Services"><FaConciergeBell /></Link>
          <Link to="/Blog" onClick={closeMenu} className="hover:text-green-600" title="Blog"><FaBlog /></Link>
          <Link to="/Contact" onClick={closeMenu} className="hover:text-green-600" title="Contact"><FaEnvelope /></Link>

          {user ? (
            <button onClick={handleLogout} className="hover:text-red-600" title="Logout"><FaSignOutAlt /></button>
          ) : (
            <Link to="/Login" onClick={closeMenu} className="hover:text-blue-600" title="Login"><FaSignInAlt /></Link>
          )}
        </nav>

        {/* Dropdown section (optional) */}
        <div className="relative" ref={dropdownRef}>
          {isDropdownOpen && user && (
            <div className="mt-2 bg-white border rounded shadow-md w-48 absolute right-20 bottom-16 z-50">
              <div className="py-1">
                <p className="block px-4 py-2 text-sm text-gray-700">
                  Welcome, {user.name}!
                </p>
                <Link
                  to="/Dashboard1"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay (Mobile/Tablet) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default RightNavbar;
