import React, { useState } from "react";
import card1 from '../Assets/image3.jpg';


const BlogPage = () => {

  const latestPosts = [
    {
      id: 1,
      title: "The Importance of Organic Farming",
      date: "December 7, 2024",
      img: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Top 10 Tips for Sustainable Agriculture",
      date: "December 6, 2024",
      img: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "How to Maximize Crop Yields",
      date: "December 5, 2024",
      img: "https://via.placeholder.com/300x200",
    },
  ];

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    alert(`Search functionality is not yet implemented! You searched for: ${searchTerm}`);
  };


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


    
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">

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




      {/* Header */}
      <header className="bg-yellow-500 text-white py-6 text-center">
        <h1 className="text-2xl font-bold">How to Care for Cows to Have the Best Quality Meat</h1>
        <p className="mt-2">Agriculture | Farm | December 8, 2024</p>
      </header>

{/* Search Section */}
<div className="bg-gray-100 py-6 px-4 md:px-16 lg:px-24 flex justify-center">
        <div className="flex w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for blogs..."
            className="w-full px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-6 py-3 rounded-r-lg hover:bg-green-800 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>




      {/* Main Blog Content */}
      <main className="py-12 px-4 md:px-16 lg:px-24">
        {/* Blog Image */}
        <img
          src="https://via.placeholder.com/1200x600"
          alt="Blog Feature"
          className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
        />

        {/* Blog Text Content */}
        <article className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-6 text-lg leading-relaxed">
            Caring for cows is essential to ensure that they are healthy and produce high-quality meat. 
            Proper nutrition, comfortable housing, and regular veterinary care play key roles in maintaining 
            the health of the cows. Providing adequate water and a balanced diet can significantly improve 
            the overall productivity of the herd.
          </p>

          <h2 className="text-xl font-bold mb-4">If this is true, you may be wondering: Why New York?</h2>
          <div className="flex flex-wrap items-start bg-gray-100 p-6 rounded-lg mb-8">
            {/* Image & Video */}
            <img
              src="https://via.placeholder.com/300x200"
              alt="Farmer with cows"
              className="w-1/2 md:w-1/3 h-auto rounded-lg shadow-md mr-6"
            />
            {/* Text Section */}
            <ul className="list-disc text-lg pl-6">
              <li>Access to high-quality veterinary services</li>
              <li>Opportunities for research and innovation</li>
              <li>Balanced and nutritious feed options</li>
              <li>Proper housing and fencing solutions</li>
              <li>Government support and subsidies</li>
            </ul>
          </div>

          <blockquote className="bg-green-100 text-green-800 italic border-l-4 border-green-600 p-6 mb-8 rounded-lg">
            "A sustainable craft only embodies the fusion of technological achievements with a commitment to ensuring environmental impact."
          </blockquote>

          <p className="mb-6 text-lg">
            A comprehensive guide can make it easier for farmers to address the common issues encountered 
            while raising cows. These include inadequate access to veterinary care, inefficient feeding practices, 
            and environmental stress factors. With the right resources, farmers can improve productivity and reduce costs.
          </p>
        </article>

        
       
      </main>

      {/* /////////////////// */}
       {/* Content Section */}
       <main className="py-10 px-4 md:px-16 lg:px-24">
        {/* Featured Image */}
        <img
          src="https://via.placeholder.com/1200x600"
          alt="Cow care"
          className="w-full rounded-lg shadow-lg mb-10"
        />

        {/* Article Content */}
        <article className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Cattle Care Matters
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Proper cow care involves regular checkups, feeding schedules,
            hydration, and maintaining a clean environment. It’s essential to
            ensure their overall well-being to produce high-quality meat and
            dairy products.
          </p>

          {/* Embedded Section */}
          <div className="bg-yellow-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-yellow-700">
              If this is true, you might be wondering, Why New York?
            </h3>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>High demand for local, organic beef.</li>
              <li>Opportunities for sustainable farming practices.</li>
              <li>Government incentives for farmers.</li>
            </ul>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            Caring for cows is not just about the product; it’s about respecting
            the animal, the process, and the ecosystem.
          </p>

          {/* Additional Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Farmer with cow"
              className="rounded-lg shadow-md"
            />
            <img
              src="https://via.placeholder.com/600x400"
              alt="Cow in field"
              className="rounded-lg shadow-md"
            />
          </div>
        </article>


{/* Latest Posts Section */}
<section className="bg-gray-100 py-12 px-4 md:px-16 lg:px-24">
        <h2 className="text-2xl font-bold text-center mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.date}</p>
                <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>





        {/* Comment Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Comments</h3>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {/* Example Comment */}
            <div className="flex items-start mb-4">
              <img
                src="https://via.placeholder.com/50"
                alt="User Avatar"
                className="w-12 h-12 rounded-full shadow-md mr-4"
              />
              <div>
                <h4 className="text-lg font-bold">John Doe</h4>
                <p className="text-gray-600 text-sm">December 8, 2024 at 10:00 am</p>
                <p className="mt-2 text-gray-700">
                  Great article! It provides valuable insights into proper cow care. Looking forward to more such content.
                </p>
              </div>
            </div>
          </div>

          {/* Add Comment */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-4">Leave a Comment</h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                rows="5"
                placeholder="Message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-300">
                Post Comment
              </button>
            </div>
          </div>
        </section>
       
      </main>








{/* //////////////////////////// */}








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

export default BlogPage;
