import React, { useState } from "react";
import card1 from "../Assets/image3.jpg";
import loginbackground from "../Assets/background1.jpg";

const Registration = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  // Backend connection for sign-up
  const handleSignUp = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const cPassword = document.getElementById("signup-cpassword").value;

    if (!name || !email || !password || !cPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== cPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`, // Vite
        // `${process.env.REACT_APP_API_URL}/register`, // CRA
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setIsActive(false);
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  // Backend connection for sign-in
  const handleSignIn = async (event) => {
    event.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/signin`, // Vite
        // `${process.env.REACT_APP_API_URL}/signin`, // CRA
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        window.location.href = "/dashboard";
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div>
      <div className={`containerRegister ${isActive ? "active" : ""}`}>
        <style>{`
          body {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            background-image: url(${loginbackground});
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          /* (keeping your full CSS same as before) */
        `}</style>

        {/* Registration and Login Forms */}
        <main>
          <div className="form-container sign-up">
            <form id="signup-form" onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <div className="social-icons">
                <a href="/auth/google" className="icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="/auth/facebook" className="icon">
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
              <input type="text" id="name" placeholder="Full Name" required />
              <input type="email" id="signup-email" placeholder="Email Address" required />
              <input type="password" id="signup-password" placeholder="Password" required />
              <input type="password" id="signup-cpassword" placeholder="Confirm Password" required />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form id="signin-form" onSubmit={handleSignIn}>
              <h1>Sign In</h1>
              <input type="email" id="signin-email" placeholder="Email Address" required />
              <input type="password" id="signin-password" placeholder="Password" required />
              <a href="#">Forget Your Password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all site features</p>
                <button className="hiddenBtn" onClick={handleLoginClick}>
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all site features</p>
                <button className="hiddenBtn" onClick={handleRegisterClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Registration;
