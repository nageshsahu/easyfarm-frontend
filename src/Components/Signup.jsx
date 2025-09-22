import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import card1 from "../Assets/image3.jpg";
import loginbackground from "../Assets/background1.jpg";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successfulSignup, setSuccessfulSignup] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset previous messages
    
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
    
        try {
            setLoading(true); // Set loading state
            const response = await axios.post(
                "http://localhost:5000/api/auth/signup",
                { name, email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, // Allow cookies
                }
            );
    
            setMessage(response.data.message || "Signup successful!");
            setSuccessfulSignup(true);
            
            // Reset form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/Login");
            }, 2000);
            
        } catch (error) {
            // Improved error handling
            if (error.response) {
                setMessage(error.response.data.error || "An error occurred.");
            } else if (error.request) {
                setMessage("Server did not respond. Please try again later.");
            } else {
                setMessage("Something went wrong. Please check your input and try again.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${loginbackground})` }}
        >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
                    <img src={card1} alt="Signup Illustration" className="object-cover w-full h-64 md:h-full" />
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-8">
                    <h2
                        className="text-3xl font-bold text-green-800 mb-6"
                        style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}
                    >
                        Create an Account
                    </h2>
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="block font-bold text-yellow-500">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold text-yellow-500">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold text-yellow-500">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold text-yellow-500">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-500 text-black px-4 py-2 rounded-md w-full hover:bg-yellow-600 shadow-md"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Signup"}
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 ${successfulSignup ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                    <div className="mt-4 flex justify-between">
                        <Link to="/Login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                        <Link to="/ForgotPassword" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
