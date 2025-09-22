import React, { useState, useEffect } from 'react';
import backgroundImage1 from '../Assets/image1.jpg'; // Adjust the path as necessary
import backgroundImage2 from '../Assets/image5.jpg'; // Adjust the path as necessary
import card1 from '../Assets/image3.jpg'
import card2 from '../Assets/image8.jpg'
import card3 from '../Assets/image9.jpg'
import card4 from '../Assets/image11.jpg'

import FAQSection from './FAQ';
import Contact from './Contact';
import cGrow from '../Assets/image121.jpg';
import {Link} from 
'react-router-dom';
 



const Home = () => {
  // State to track the background image and font
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [fontFamily, setFontFamily] = useState('Playfair Display');
  const backgrounds = [backgroundImage1, backgroundImage2]; // Array of images
  const fonts = ['Playfair Display', 'Dancing Script']; // Corresponding fonts for the images

  // Change background image and font every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % backgrounds.length;
        setFontFamily(fonts[newIndex]); // Change font when background changes
        return newIndex;
      });
    }, 8000); // Change every 8 seconds (you can adjust the duration)

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);


  // //////////////////////////////////////////////////
  const services = [
    {
      icon: "🌱", // Replace with actual icons or SVGs
      title: "Disease Detection Using CNN",
      description:
        "AI-Powered Analysis",
    },
    {
      icon: "🐄",
      title: "User Friendly Dashboard",
      description:
        "Real-Time Data Access",
    },
    {
      icon: "🐓",
      title: "Crop Recommendation",
      description:
        " Get predictions on potential crop yields",
    },
    {
      icon: "🪴",
      title: "Environment Monitoring",
      description:
        "Stay informed about current and upcoming weather conditions",
    },
  ];

  // ///////////////////////////////////////////////////

  const posts = [
    {
      date: "08 Jun 24",
      title: "How to Care for Cows to have the Best Quality Meat",
      description:
        "Duis eleifend euismod arcu, nec faucibus mauris finibus id. Integer mattis, tellus non finibus rutrum quam lorem dignissim nulla.",
      image: {card2}, // Replace with your image URL
      author: "Hardson",
      category: "Agriculture, Farm",
      comments: 0,
    },
    {
      date: "08 Jun 24",
      title: "The Best Time to Harvest Corn Without Wilting",
      description:
        "Duis eleifend euismod arcu, nec faucibus mauris finibus id. Integer mattis, tellus non finibus rutrum quam lorem dignissim nulla.",
      image: {card3}, // Replace with your image URL
      author: "Hardson",
      category: "Agriculture, Farm",
      comments: 0,
    },
    {
      date: "08 Jun 24",
      title: "The Joy of Working Every Day on a Sheep Farm",
      description:
        "Duis eleifend euismod arcu, nec faucibus mauris finibus id. Integer mattis, tellus non finibus rutrum quam lorem dignissim nulla.",
      image: {card4}, // Replace with your image URL
      author: "Hardson",
      category: "Agriculture, Farm",
      comments: 0,
    },
  ];

  // /////////////////////////////////////////////////////////////////////////////

  

  return (
    <div className="relative w-full h-screen">
      <img
        src={backgrounds[backgroundIndex]}
        alt="Agricultural Background"
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1500 zoom-animation"
      />
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-8 text-white">
        <h2 className="text-2xl text-yellow-400 text-lg mb-4 animate-slide-in">
          Better Agriculture for Better Future
        </h2>
        <h1 className="text-5xl mb-6 animate-slide-in-delayed" style={{ fontFamily }}>
          EVERY CROP COUNTS, <br /> EVERY FARMER MATTERS.
        </h1>
        <Link to="/Services">
        <button className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-400 animate-bounce">
          See Our Services
        </button>
        </Link>
        
      </div>





      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        * {
          font-family: 'Playfair Display', serif;
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-delayed {
          0% {
            opacity: 0;
            transform: translateX(-150px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes zoom-in-out {
          0% {
            transform: scale(1);
          }
          55% {
            transform: scale(1.1); /* Zoom in */
          }
          80% {
            transform: scale(1); /* Zoom out */
          }
        }

        .animate-slide-in {
          animation: slide-in 1s ease-out forwards;
        }

        .animate-slide-in-delayed {
          animation: slide-in-delayed 1.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 2s ease-out forwards;
        }

        .zoom-animation {
          animation: zoom-in-out 8s ease-in-out infinite;
        }
      `}</style>
     
     <div className="bg-yellow-400 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {/* Card 1 */}
        <div className="relative w-full max-w-xs h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
          <img
            src={card1}
            alt="New Technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Heading Box */}
            <div className="absolute bottom-6 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg group-hover:opacity-0 group-hover:translate-y-4 transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg text-green-900">We Use New Technology</h2>
            </div>
            {/* Text Box */}
            <div className="absolute bottom-0 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20%] transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg mb-2 text-green-900">We Use New Technology</h2>
              <p className="text-sm text-gray-600">
                Explore how advanced technologies transform agriculture.
              </p>
              <button className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative w-full max-w-xs h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
          <img
            src={card1}
            alt="Healthy Foods"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Heading Box */}
            <div className="absolute bottom-6 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg group-hover:opacity-0 group-hover:translate-y-4 transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg text-green-900">Making Healthy Foods</h2>
            </div>
            {/* Text Box */}
            <div className="absolute bottom-0 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20%] transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg mb-2 text-green-900">Making Healthy Foods</h2>
              <p className="text-sm text-gray-600">
                Learn about our commitment to healthy and sustainable produce.
              </p>
              <button className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative w-full max-w-xs h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
          <img
            src={card1}
            alt="Reforming Systems"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Heading Box */}
            <div className="absolute bottom-6 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg group-hover:opacity-0 group-hover:translate-y-4 transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg text-green-900">Reforming Systems</h2>
            </div>
            {/* Text Box */}
            <div className="absolute bottom-0 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20%] transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg mb-2 text-green-900">Reforming Systems</h2>
              <p className="text-sm text-gray-600">
                Discover our innovative approaches to agricultural reforms.
              </p>
              <button className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative w-full max-w-xs h-80 overflow-hidden rounded-lg shadow-lg bg-white group">
          <img
            src={card1}
            alt="Smart Farming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Heading Box */}
            <div className="absolute bottom-6 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg group-hover:opacity-0 group-hover:translate-y-4 transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg text-green-900">Smart Farming</h2>
            </div>
            {/* Text Box */}
            <div className="absolute bottom-0 w-11/12 p-4 bg-white text-center rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20%] transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-lg mb-2 text-green-900">Smart Farming</h2>
              <p className="text-sm text-gray-600">
                Discover how data drives modern agriculture.
              </p>
              <button className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <div className="bg-gray-50 py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800">
          We Providing The Best Agricultural Services
        </h2>
        <p className="text-gray-600 mt-2">
          Duis eleifend euismod arcu, nec faucibus mauris finibus id.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-green-900 text-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="text-yellow-400 text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-center">{service.description}</p>
            <div className="mt-4">
            <Link to="/Dashboard">
              <button className="text-yellow-400 hover:underline flex items-center">
                Explore
                <span className="ml-1 transform rotate-90">➤</span>
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ///////////////////////////////   PAGE 2     /////////////////////////////////////////////// */}
    <div className="mb-6">
            <h2 className="text-4xl text-center font-bold text-green-800">
              Latest Blogs
            </h2>
            </div>
    <div className="bg-gray-50 py-12 px-6">

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     
        
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-white font-semibold text-sm px-3 py-1 rounded">
                {post.date}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="mr-2">👤 {post.author}</span>
                <span className="mr-2">🏷 {post.category}</span>
                <span>💬 {post.comments} Comments</span>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <button className="text-green-700 font-semibold hover:underline">
                Continue Reading →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>



    {/* /////////////////////////    PAGE 3        ////////////////////////////////////// */}


    {/* <Contact/> */}



    {/* /////////////////////     Backchodi ////////////////////////////// */}

    <section className="bg-white flex flex-col md:flex-row items-center px-8 py-12 md:py-16">
      <div className="md:w-1/2">
        <img
          src={cGrow} // Replace with your image path
          alt="Farmer with sheep"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
        <h3 className="text-yellow-600 font-semibold text-lg">
          Why Choose EasyFarm?
        </h3>
        <h1 className="text-green-800 font-bold text-3xl md:text-4xl mt-2">
          Our Crops Are Grown With Wonderful Love Of Nature
        </h1>
        <p className="text-gray-700 mt-4 leading-relaxed">
        At FarmEasy, we combine cutting-edge AI-driven technology with sustainable farming practices to provide personalized, cost-effective solutions that optimize your farm's productivity and efficiency. Our platform offers real-time monitoring, expert advice, and tailored recommendations based on your unique farm conditions, ensuring you can make informed decisions quickly. With a focus on sustainability, education, and ongoing support, FarmEasy empowers farmers to improve crop yields, enhance livestock care, and reduce environmental impact, all while being part of a community that fosters collaboration and growth. Choose us for smarter, greener farming solutions that help you thrive.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-700 transition">
          More Why Choose Us
        </button>
      </div>
    </section>



    {/* ///////////////////    F & Q  ////////////////////////////////////         */}

     <div>
      <FAQSection/>
     </div>

    {/* ///////////     Footer ///////////////////////////////// */}


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


    {/* ////////////////////////////////// KHatma  */}
  
     
    </div>
  );
};

export default Home;
