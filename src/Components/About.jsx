import React from 'react';
import card1 from '../Assets/image3.jpg';
import aboutBg from "../Assets/image6.png"; // Replace with your image path
import missionImg from "../Assets/image5.jpg"; // Replace with your image path
import visionImg from "../Assets/image3.jpg"; // Replace with your image path


const About = () => {

// //////////////////////////

const aboutSection = {
    title: "About the Farm",
    subtitle:
      "We are confident that we are the leading farm in providing agricultural products that ensure food hygiene and safety.",
    stats: [
      { number: "1,386+", text: "Completed Projects" },
      { number: "12,980+", text: "Trust by Clients" },
    ],
  };

  const features = [
    {
      icon: "🍅", // Replace with an actual icon if needed
      title: "Efficiecny",
      description:
        "Make informed decisions quickly with precise data.",
    },
    {
      icon: "🚜", // Replace with an actual icon if needed
      title: "Sustainability ",
      description:
        "Reduce waste, save resources, and grow smarter.",
    },
    {
      icon: "🍃", // Replace with an actual icon if needed
      title: "Profitability",
      description:
        "Maximize your yield and earnings with tailored AI solutions.",
    },
    {
      icon: "💲", // Replace with an actual icon if needed
      title: "Reasonable Price",
      description:
        "Ultrices sagittis orci a scelerisque purus semper eget duis at. Sollicitudin nibh sit amet.",
    },
  ];



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


// ///////////////////





  return (     





    <div className="bg-[#235130] text-[#eeeeee] font-sans min-h-screen overflow-x-hidden">
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
            About FarmEasy
          </h1>
          <p className="mt-4 text-lg text-[#f8c32c]">
            Providing AI-Driven Farming Solutions for Sustainable and Efficient Agriculture.
          </p>
        </div>
      </section>



      {/* /////////////////////////////// */}


<div className="min-h-screen">
     

     {/* Content Section */}
     <div className="bg-gray-100 py-12">
       <div className="container mx-auto px-6 md:px-12">
         <h2 className="text-3xl font-bold text-center text-green-700">
           Providing the Finest Products to the Best Feed Suppliers
         </h2>
         <p className="text-center text-gray-600 mt-4 max-w-4xl mx-auto">
           We are confident that we are the leading farm in providing
           agricultural products that ensure food hygiene and safety. Our
           innovative farming solutions meet international standards.
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
           {/* Mission */}
           <div className="bg-white shadow-lg rounded-lg p-6 text-center">
             <img
               src={missionImg}
               alt="Mission"
               className="rounded-t-lg w-full h-40 object-cover"
             />
             <h3 className="text-xl font-bold text-green-700 mt-4">
               Disease Detection
             </h3>
             <p className="text-gray-600 mt-2">
             Identify crop diseases early with our AI-powered detection system. Save your harvest and reduce losses with real-time analysis and actionable solutions.

             </p>
           </div>
           <div className="bg-white shadow-lg rounded-lg p-6 text-center">
             <img
               src={missionImg}
               alt="Mission"
               className="rounded-t-lg w-full h-40 object-cover"
             />
             <h3 className="text-xl font-bold text-green-700 mt-4">
               User Friendly Dashboard
             </h3>
             <p className="text-gray-600 mt-2">
             Our intuitive dashboard gives you insights into your farm's health, crop status, and weather updates, making farm management seamless and efficient.

             </p>
           </div>
           

           {/* Vision */}
           <div className="bg-white shadow-lg rounded-lg p-6 text-center">
             <img
               src={visionImg}
               alt="Vision"
               className="rounded-t-lg w-full h-40 object-cover"
             />
             <h3 className="text-xl font-bold text-green-700 mt-4">
               Crop Recommendation
             </h3>
             <p className="text-gray-600 mt-2">
             Get AI-driven recommendations tailored to your soil type, climate conditions, and market trends to grow the most profitable crops.

             </p>
           </div>
            {/* Vision */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
             <img
               src={visionImg}
               alt="Vision"
               className="rounded-t-lg w-full h-40 object-cover"
             />
             <h3 className="text-xl font-bold text-green-700 mt-4">
               Environment Monitoring
             </h3>
             <p className="text-gray-600 mt-2">
             Stay ahead of environmental changes with sensors and AI tools that track weather, humidity, and soil quality, ensuring optimal farming conditions.

             </p>
           </div>

           {/* Skills */}
           <div className="bg-white shadow-lg rounded-lg p-6 text-center">
             <h3 className="text-xl font-bold text-green-700">Our Skills</h3>
             <p className="text-gray-600 mt-2">Organic Solutions</p>
             <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
               <div className="bg-green-500 h-4 rounded-full w-3/4"></div>
             </div>
             <p className="text-gray-600 mt-4">Quality Agriculture</p>
             <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
               <div className="bg-green-500 h-4 rounded-full w-4/5"></div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>




{/* //////////////////////////// */}


<div className="font-sans">
      {/* About Section */}
      <div className="bg-green-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            {aboutSection.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{aboutSection.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            {aboutSection.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-3xl font-bold text-green-700">
                  {stat.number}
                </h2>
                <p className="text-gray-600">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-green-800 py-12">
        <div className="container mx-auto px-4">
          {/* Features Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white"  style={animations.bounce} >Why Choose Us</h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-green-700 text-center p-6 rounded-lg text-white shadow-lg"
              >
                <div className="text-yellow-400 text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

{/* //////////////////// */}

     

      {/* Map and Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* Left Section: Map */}
          <div className="w-full md:w-1/2">
            <div
              className="rounded-lg shadow-lg p-4"
              style={{
                backgroundColor: '#0D401C0D',
                color: '#072010',
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: '#f8c32c' }}>
                Our Location
              </h2>
              <iframe
                title="Map"
                className="w-full rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509364!2d-122.42067968468128!3d37.77492977975983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbbb1111%3A0x8c8a899e10111234!2sYour%20Location!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="w-full md:w-1/2">
            <div
              className="rounded-lg shadow-lg p-8 max-w-2xl w-full"
              style={{
                backgroundColor: '#0D401C0D',
                color: '#072010',
              }}
            >
              <h1
                className="text-4xl font-bold text-center"
                style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}
              >
                Contact Us
              </h1>
              <p className="mt-4 text-center" style={{ color: '#6e7673' }}>
                We'd love to hear from you! Fill out the form below or reach us via email.
              </p>
              <form className="mt-8 space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold"
                    style={{ color: '#072010' }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="mt-2 w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      backgroundColor: '#f8c32c',
                      color: '#000000',
                      border: 'none',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold"
                    style={{ color: '#072010' }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="mt-2 w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      backgroundColor: '#f8c32c',
                      color: '#000000',
                      border: 'none',
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold"
                    style={{ color: '#072010' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Enter your message"
                    className="mt-2 w-full px-4 py-2 rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      backgroundColor: '#f8c32c',
                      color: '#000000',
                      border: 'none',
                    }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg font-bold transition-all"
                    style={{
                      backgroundColor: '#278d45',
                      color: '#ffffff',
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
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
  );
};

export default About;
