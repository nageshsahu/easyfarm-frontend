import React from "react";
import farmImage1 from "../Assets/image2.jpg"; // Replace with your image path
import farmImage2 from "../Assets/image4.jpg"; // Replace with your image path
import farmImage3 from "../Assets/image3.jpg"; // Replace with your image path
import farmImage4 from "../Assets/image1.jpg"; // Replace with your image path
import card1 from '../Assets/image3.jpg';
import { Link } from "react-router-dom";

const Services = () => {
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

  const services = [
    {
      title: "Disease Detection",
      image: farmImage3,
      category: "AI Solutions",
      description: "Discover AI solutions for early disease detection in crops.",
      additionalInfo: "Utilizing advanced algorithms to identify crop diseases early.",
      link: "/DiseaseDetectionPage"
    },
    {
      title: "Crop Recommendation",
      image: farmImage4,
      category: "AI Solutions",
      description: "Get insights on the best crops to plant based on soil and climate.",
      additionalInfo: "Tailored recommendations to maximize yield and sustainability.",
      link: "/CropRecommendation"
    },
    {
      title: "Environmental Monitoring",
      image: farmImage1,
      category: "Sustainability",
      description: "Monitor environmental factors affecting agriculture.",
      additionalInfo: "Real-time data collection for better decision-making.",
      link: "/Dashboard1"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
            style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}
          >
            About FarmEasy
          </h1>
          <p className="mt-4 text-lg text-[#f8c32c]">
            Providing AI-Driven Farming Solutions for Sustainable and Efficient Agriculture.
          </p>
        </div>
      </section>

      {/* Our Services Section */}
      <div className="relative bg-yellow-400 p-6">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-wide bg-green-600 text-white inline-block px-4 py-2 rounded-md" style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>
            Our Services
          </h1>
          <p className="text-lg mt-4 opacity-90">
            Discover outstanding projects and innovative solutions that inspire.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-yellow-400 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative w-full max-w-xs h-80 overflow-hidden rounded-lg shadow-lg bg-green-100 group" // Changed card background color
 >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                {/* Heading Box */}
                <div className="absolute bottom-6 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg group-hover:opacity-0 group-hover:translate-y-4 transition-all duration-500 ease-in-out">
                  <h2 className="font-bold text-lg text-green-900">{service.title}</h2>
                </div>
                {/* Text Box */}
                <div className="absolute bottom-0 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20%] transition-all duration-500 ease-in-out">
                  <h2 className="font-bold text-lg mb-2 text-green-900">{service.title}</h2>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                  <Link to={service.link}>
                    <button className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us!</h3>
            <p>Prinsengracht 250, 2501016 PM Amsterdam Netherlands</p>
            <p>Call us: (234) 109-6666</p>
            <p>Mail: Donalfarms@gmail.com</p>
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
          Copyright © 2024 Donal Farm. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Services;