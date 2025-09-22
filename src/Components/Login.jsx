import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import card1 from "../Assets/image3.jpg";
import loginbackground from "../Assets/background1.jpg";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Verify token validity
            axios
                .get("http://localhost:5000/api/auth/session", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.user) {
                        setIsLoggedIn(true);
                    }
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password },
                { withCredentials: true }
            );
            
            // Store token in localStorage
            localStorage.setItem("token", response.data.token);
            
            // Update user in state (via the setUser prop)
            if (response.data.user) {
                setUser(response.data.user);
            }
            
            setMessage("Login successful!");
            setIsLoggedIn(true);
            
            // Redirect after a short delay to show success message
            setTimeout(() => {
                navigate("/Dashboard1");
            }, 1000);
            
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.response?.data?.error || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // If already logged in, redirect to dashboard
    if (isLoggedIn) {
        return <Navigate to="/Dashboard1" />;
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${loginbackground})` }}
        >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
                    <img src={card1} alt="Card" className="object-cover w-full h-64 md:h-full" />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2
                        className="text-3xl font-bold text-green-800 mb-6"
                        style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}
                    >
                        Welcome Back!
                    </h2>
                    <form onSubmit={handleLogin}>
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
                        <div className="mb-4">
                            <label className="block font-bold text-yellow-500">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-600 shadow-md"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                    <div className="mt-4 flex justify-between">
                        <Link to="/Signup" className="text-blue-500 hover:underline">
                            Sign Up
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

export default Login;
