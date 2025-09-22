import React from "react";
import card1 from '../Assets/image4.jpg';
import card2 from '../Assets/image8.jpg'
import card3 from '../Assets/image15.jpg'
import card4 from '../Assets/image11.jpg'
import card5 from '../Assets/image16.jpg'


import {Link} from 
'react-router-dom';
 


const Blog3 = () => {
    const totalPages = 3; // Total number of pages (adjust as per your data)


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
    <div className="bg-gray-50 min-h-screen font-sans">

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
           Our Blogs
           </h1>
          {/* <p className="mt-4 text-lg text-[#f8c32c]">
            Providing AI-Driven Farming Solutions for Sustainable and Efficient Agriculture.
          </p> */}
        </div>
      </section>



      {/* Newsletter Section */}
      <div className="bg-yellow-500 text-white py-8 px-4 text-center">
        <h2 className="text-xl font-bold">Subscribe to Newsletter</h2>
        <p className="mt-2">
          These articles help you better understand how to improve your farm.
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter email"
            className="px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button className="bg-green-700 px-6 py-2 rounded-r-md text-white hover:bg-green-800 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="py-10 px-4 md:px-16 lg:px-24 grid gap-12 md:grid-cols-2">
        {/* Blog Post Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 min-h-[400px]">
          <img
            src={card2}
            alt="Cow"
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              How to Care for Cows to have the Best Quality Meat
            </h3>
            <p className="text-base text-gray-600 mb-4">
              Learn the essential tips for keeping your cows healthy and
              productive.
            </p>
            <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition duration-300">
              Continue Reading
            </button>
          </div>
        </div>

        {/* Blog Post Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 min-h-[400px]">
          <img
            src={card3}
            alt="Corn"
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              The Best Time to Harvest Corn Without Wilting
            </h3>
            <p className="text-base text-gray-600 mb-4">
              Timing is everything when it comes to harvesting crops like corn.
            </p>
            <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition duration-300">
              Continue Reading
            </button>
          </div>
        </div>

        {/* Blog Post Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 min-h-[400px]">
          <img
            src={card4}
            alt="Sheep"
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              The Joy of Working Every Day on a Sheep Farm
            </h3>
            <p className="text-base text-gray-600 mb-4">
              Find happiness and fulfillment in the daily routine of sheep
              farming.
            </p>
            <Link to="/BlogPage">

            <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition duration-300">
              Continue Reading
            </button>
            </Link>
          </div>
        </div>

        {/* Blog Post Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 min-h-[400px]">
          <img
            src={card5}
            alt="Greenhouse"
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              The Case for Investing in Greenhouses
            </h3>
            <p className="text-base text-gray-600 mb-4">
              Explore why greenhouses are a smart investment for modern
              agriculture.
            </p>
            <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition duration-300">
              Continue Reading
            </button>
          </div>
        </div>
      </div>

     {/* Pagination */}
     <div className="flex justify-center items-center py-8 space-x-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Link key={index} to={`/blogs/page/${index + 1}`}>
            <button className="bg-gray-200 px-4 py-3 text-lg rounded-md hover:bg-gray-300 transition duration-300">
              {index + 1}
            </button>
          </Link>
        ))}
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
  );
};

export default Blog3;
