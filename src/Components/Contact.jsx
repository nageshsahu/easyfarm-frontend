import React from 'react'
import card1 from '../Assets/image3.jpg';


const Contact = () => {

  // Inline animation styles
  const animations = {
    fadeIn: {
      animation: "fadeIn 2s ease-out",
    },
    slideIn: {
      animation: "slideIn 1.5s ease-in-out",
    },
    bounce: {
      animation: "bounce 1.5s infinite",
    },
  };

  const keyframes = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `;
  return (
    <div>
       {/* Inject custom keyframes */}
       <style>{keyframes}</style>
      {/* Hero Section */}
      
      <section
        className="relative flex items-center py-32 px-4 bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${card1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-left max-w-2xl pl-8">
          <h1
            className="text-5xl font-bold text-white"
            style={  { fontFamily: "'UnifrakturMaguntia', cursive" }}   
          >
              Contact Us
          </h1>
          {/* <p className="mt-4 text-lg text-[#f8c32c]">
            Providing AI-Driven Farming Solutions for Sustainable and Efficient Agriculture.
          </p> */}
        </div>
      </section>
<div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Contact Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-green-800">
              Let's Cooperate Together
            </h2>
            <p className="text-gray-600 mt-2">
              We will reply to you within 24 hours via email. Thank you for
              contacting us.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="text-yellow-500 mr-4">
                📍
              </div>
              <div>
                <h4 className="font-semibold text-green-700">Farm Address</h4>
                <p className="text-gray-600">
                  BHILAI
                  <br />
                  SSTC BHILAI JUNWANI
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-yellow-500 mr-4">
                📧
              </div>
              <div>
                <h4 className="font-semibold text-green-700">Contact Us</h4>
                <p className="text-gray-600">
                  farmeasy@gmail.com
                  <br />
                  Call Us 24/7: +91 xxx xxx xxxx
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-yellow-500 mr-4">
                ⏰
              </div>
              <div>
                <h4 className="font-semibold text-green-700">Working Hours</h4>
                <p className="text-gray-600">Mon - Sat: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-green-800 p-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name*"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="Email*"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone*"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option>You need support?</option>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Feedback</option>
              </select>
            </div>
            <textarea
              placeholder="Message..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

          {/* Footer */}
          <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
        {/* Contact Section */}
        <div>
        <h3 className="font-bold text-lg mb-4">Contact Us!</h3>
          <p>SSTC BHILAI JUNWANI</p>
          <p>Call us: (+91) xxxxxxxxxx</p>
          <p>Mail: FarmEasy@gmail.com</p>
          <p>Mon - Sat: 8.00am - 18.00pm</p>
        </div>
        {/* News Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">News Posts</h3>
          <p className="mb-2">Learn 10 Best Tips for New Farmers - 30 Oct, 2024</p>
          <p>Farmer Sentiment Darkens - 30 Oct, 2024</p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul>
            <li>Learn About Us</li>
            <li>Services We Provide</li>
            <li>View Recent Projects</li>
            <li>Meet The Farmers</li>
            <li>Upcoming Events</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe Newsletter</h3>
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-md mb-4"
          />
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-400">
            Subscribe Now!
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        Copyright © 2024 FarmEasy. All Rights Reserved.
      </div>
    </footer>


    </div>
  )
}

export default Contact