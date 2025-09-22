import React, { useState } from "react";
import { motion } from "framer-motion";
import farmHelp from '../Assets/farmhelp2.jpg';



const FAQSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <motion.img
            src={farmHelp}
            alt="FAQ Illustration"
            className="w-full h-auto rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* FAQ Section */}
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left mb-12"
          >
            <h3 className="text-yellow-500 font-medium text-lg">
              Frequently Asked Questions
            </h3>
            <h1 className="text-green-800 font-bold text-3xl md:text-4xl leading-snug">
              Need Help? <br /> We've Got You Covered
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              Browse through our FAQs for answers to common questions. If you
              can't find what you're looking for, feel free to reach out to us.
            </p>
          </motion.div>

          {/* FAQ Cards */}
          <div className="space-y-6">
            {[
              {
                question: "What is FarmEasy?",
                answer:
                  " FarmEasy is a platform that provides AI-driven farming solutions to help farmers improve sustainability, efficiency, and productivity in agriculture.",
              },
              {
                question: "How does FarmEasy benefit farmers?",
                answer:
                  "FarmEasy offers advanced tools and resources, such as crop monitoring, weather predictions, and livestock management, enabling farmers to make informed decisions for better yields.!",
              },
              {
                question: "How can I improve my crop yield?",
                answer:
                  "FarmEasy recommends using AI-based crop monitoring tools, regular soil testing, and adhering to the best farming practices outlined on our platform.",
              },
              {
                question: "What crops are suitable for my region?",
                answer:
                  "Use our AI-powered tools to analyze your region’s soil, climate, and other factors to find the best crops for your area.",
              },
              {
                question: "Can I contribute articles or content to FarmEasy?",
                answer:
                  "We welcome contributions from experts and experienced farmers. Please contact us through our support email to submit your content.",
              },
              {
                question: "How can I subscribe to your newsletter?",
                answer:
                  "Enter your email address in the Subscribe to Newsletter section on our homepage and click Subscribe.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 w-full flex flex-col justify-between h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h2
                  className="text-lg font-semibold text-green-700 cursor-pointer hover:text-green-600 transition"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}
                </h2>
                {activeQuestion === index && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-600 mt-4"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
