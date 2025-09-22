import React, { useState } from 'react';
import card1 from '../Assets/image3.jpg';
import loginbackground from '../Assets/background1.jpg';

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
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const cPassword = document.getElementById('signup-cpassword').value;

    if (!name || !email || !password || !cPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (password !== cPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        setIsActive(false); // Switch to login view
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again later.');
    }
  };

  // Backend connection for sign-in
  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (!email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        window.location.href = '/dashboard'; // Redirect on successful login
      } else {
        alert(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div>
      <div className={`containerRegister ${isActive ? 'active' : ''}`}>
        <style>
          {`
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
              .navbar {
              position: fixed;
              top: 0;
              width: 100%;
              background-color: #111;
              color: white;
              text-align: center;
              padding: 15px 0;
              z-index: 1000;
            }

            .containerRegister {
              margin-top: 70px; /* Adjust to match navbar height */
              box-sizing: border-box;
              font-family: 'Montserrat', sans-serif;
              border-radius: 30px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
              position: relative;
              overflow: hidden;
              width: 768px;
              max-width: 100%;
              min-height: 480px;
              display: Flex;
              margin: 151px 2px 2px 368px;
            }

            .containerRegister p {
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 0.3px;
              margin: 20px 0;
            }

            .containerRegister a {
              color: #333;
              font-size: 13px;
              text-decoration: none;
              margin: 15px 0 10px;
            }

            .containerRegister button {
              background-color: #73cc1a;
              color: #fff;
              font-size: 12px;
              padding: 10px 45px;
              border: 1px solid transparent;
              border-radius: 8px;
              font-weight: 600;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              margin-top: 10px;
              cursor: pointer;
            }

            .containerRegister form {
              background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              padding: 0 40px;
              height: 100%;
            }

            main {
              margin-top: 70px; /* Matches navbar height */
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .containerRegister p {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.3px;
            margin: 20px 0;
          }

          .containerRegister a {
            color: #333;
            font-size: 13px;
            text-decoration: none;
            margin: 15px 0 10px;
          }

          .containerRegister button {
            background-color: #73cc1a;
            color: #fff;
            font-size: 12px;
            padding: 10px 45px;
            border: 1px solid transparent;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 10px;
            cursor: pointer;
          }

          .containerRegister button.hiddenBtn {
            background-color: transparent;
            border-color: #fff;
          }

          .containerRegister form {
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            height: 100%;
          }

          .containerRegister input {
            background-color: #eee;
            border: none;
            margin: 8px 0;
            padding: 10px 15px;
            font-size: 13px;
            border-radius: 8px;
            width: 100%;
            outline: none;
          }

          .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
          }

          .sign-in {
            left: 0;
            width: 50%;
            z-index: 2;
          }

          .containerRegister.active .sign-in {
            transform: translateX(100%);
          }

          .sign-up {
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
          }

          .containerRegister.active .sign-up {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: move 0.6s;
          }

          @keyframes move {
            0%, 49.99% {
              opacity: 0;
              z-index: 1;
            }
            50%, 100% {
              opacity: 1;
              z-index: 5;
            }
          }

          .social-icons {
            margin: 20px 0;
          }

          .social-icons a {
            border: 1px solid #ccc;
            border-radius: 20%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 3px;
            width: 40px;
            height: 40px;
          }

          .toggle-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            z-index: 1000;
          }

          .containerRegister.active .toggle-container {
            transform: translateX(-100%);
          }

          .toggle {
            background-color: #9bc472;
            height: 100%;
            background: linear-gradient(to right, #73cc1a, #73cc1a);
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
          }

          .containerRegister.active .toggle {
            transform: translateX(50%);
          }

          .toggle-panel {
            position: absolute;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 30px;
            text-align: center;
            top: 0;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
          }

          .toggle-left {
            transform: translateX(-200%);
          }

          .containerRegister.active .toggle-left {
            transform: translateX(0);
          }

          .toggle-right {
            right: 0;
            transform: translateX(0);
          }

          .containerRegister.active .toggle-right {
            transform: translateX(200%);
          }

          /* Add padding-top to avoid overlap with the navbar */
          main {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

            footer {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: #111;
              color: white;
              text-align: center;
              padding: 10px;
              z-index: 1000;
            }
      
          `}
        </style>

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
