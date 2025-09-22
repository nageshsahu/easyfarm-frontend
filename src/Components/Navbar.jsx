import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileGif from "../Assets/profilelogo.gif";
import applogo from "../Assets/app_logo.png";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
      if (isDropdownOpen) setIsDropdownOpen(false); // Close dropdown on scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isDropdownOpen]);

  // Fetch user session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/session`, {
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Update state to logged out
    setIsDropdownOpen(false); // Close the dropdown
    navigate("/"); // Navigate to home page
  };

  return (
    <div className={`navbar ${isVisible ? "visible" : "hidden"}`}>
      <style jsx>{`
        .navbar {
          position: fixed;
          width: 100%;
          z-index: 1000;
          transition: transform 0.3s ease-in-out;
        }
        .navbar.hidden {
          transform: translateY(-100%);
        }
        .navbar.visible {
          transform: translateY(0);
        }
      `}</style>

      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 transition-transform duration-300 ease-in-out">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={applogo} className="h-8" alt="EasyFarm Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EasyFarm
            </span>
          </Link>

          {/* Profile and Menu Buttons */}
          <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse relative">
            <div ref={dropdownRef}>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={profileGif} alt="User Profile" />
              </button>

              {/* User Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {user ? (
                      <>
                        <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                          Welcome, {user.name}!
                        </p>
                        <Link
                          to="/Dashboard1"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/Login"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Main Menu */}
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="mobile-menu"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:bg-transparent md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/Services"
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/Blog"
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/Contact"
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Contact
                </Link>
              </li>
              {!user && (
                <li className="md:hidden">
                  <Link
                    to="/Login"
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
