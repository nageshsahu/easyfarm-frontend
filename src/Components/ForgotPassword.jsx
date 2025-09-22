import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import card1 from '../Assets/image3.jpg';
import loginbackground from '../Assets/background1.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      // This endpoint doesn't exist yet, but we're setting up the frontend for it
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password", 
        { email },
        { withCredentials: true }
      );
      setIsSuccess(true);
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setIsSuccess(false);
      if (error.response) {
        setMessage(error.response.data.error || "An error occurred.");
      } else if (error.request) {
        setMessage("Server did not respond. This feature might not be fully implemented yet.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: `url(${loginbackground})` }}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

        {/* Left Panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
          <img src={card1} alt="Forgot Password" className="object-cover w-full h-64 md:h-full" />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>Forgot Password?</h2>
          <p className="mb-4 text-gray-600">Enter your email to receive a password reset link.</p>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block font-bold text-yellow-500">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-600 shadow-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {message && <p className={`mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
          <div className="mt-4 flex justify-between">
            <Link to="/Login" className="text-blue-500 hover:underline">Back to Login</Link>
            <Link to="/Signup" className="text-blue-500 hover:underline">Create an Account</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
