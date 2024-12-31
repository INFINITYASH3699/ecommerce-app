"use client";

import { useState, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = ({ products, setRecommendedProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ category: "", priceRange: "" });
  const [recommendedProducts, setRecommendedProductsState] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [inactivityReminder, setInactivityReminder] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [hasDismissedReminder, setHasDismissedReminder] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setStep(1);
      setAnswers({ category: "", priceRange: "" });
      setShowRecommendations(false);
      setInactivityReminder(false);
    }
  };

  const handleClearSelection = () => {
    setAnswers({ category: "", priceRange: "" });
    setStep(1);
    setShowRecommendations(false);
    setRecommendedProducts([]);
    setInactivityReminder(false);
    setHasDismissedReminder(false); // Reset dismissal on clearing
  };

  useEffect(() => {
    if (!hasDismissedReminder) {
      const timer = setInterval(() => {
        if (Date.now() - lastInteractionTime >= 5000) {
          setInactivityReminder(true);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lastInteractionTime, hasDismissedReminder]);

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setLastInteractionTime(Date.now());

    if (key === "category") {
      setStep(2);
    }
  };

  useEffect(() => {
    if (answers.category && answers.priceRange) {
      const filteredProducts = products
        .filter(
          (product) =>
            product.category === answers.category &&
            (answers.priceRange === "low"
              ? product.price < 50
              : answers.priceRange === "medium"
              ? product.price >= 50 && product.price <= 100
              : product.price > 100)
        )
        .slice(0, 5);

      setRecommendedProductsState(filteredProducts);
      setRecommendedProducts(filteredProducts);
      setShowRecommendations(filteredProducts.length > 0);
    } else {
      setShowRecommendations(false);
    }
  }, [answers, products, setRecommendedProducts]);

  return (
    <div>
      {/* Floating Chatbot Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChatbot}
          className="p-4 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-full shadow-xl hover:scale-110 transition-all"
        >
          {isOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}
        </button>
      </div>

      {/* Inactivity Reminder */}
      {inactivityReminder && !isOpen && !hasDismissedReminder && (
        <div className="fixed bottom-20 right-12 z-50">
          <div className="relative bg-white border shadow-lg rounded-xl p-4 w-68 text-md font-medium text-gray-800 flex items-center justify-between">
            {/* Text */}
            <p>Need help? I'm here for you! 😊</p>
            {/* Close Button */}
            <button
              onClick={() => {
                setInactivityReminder(false);
                setHasDismissedReminder(true);
              }}
              className="ml-2 text-gray-500 hover:text-red-500"
              title="Close"
            >
              ✖
            </button>
          </div>
          {/* Arrow pointing to the icon */}
          <div className="absolute right-4 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border border-t-white"></div>
        </div>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-72 h-[350px] bg-white rounded-xl shadow-lg p-4 border border-indigo-400 z-50">
          <div className="flex flex-col h-full">
            <div className="text-lg font-semibold mb-4 text-center text-indigo-600">
              Chat Assistant
            </div>
            <div className="flex-grow overflow-y-auto space-y-4">
              {!showRecommendations ? (
                <div>
                  {step === 1 && (
                    <div>
                      <p className="mb-4 text-base font-medium text-gray-700">
                        What type of products are you looking for?
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "electronics",
                          "jewelery",
                          "men's clothing",
                          "women's clothing",
                        ].map((category) => (
                          <button
                            key={category}
                            onClick={() => handleAnswer("category", category)}
                            className="py-2 px-1 bg-gradient-to-r text-xs from-indigo-300 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transition-all"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="mb-4 text-base font-medium text-gray-700">
                        What price range are you looking for?
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {["low", "medium", "high"].map((range) => (
                          <button
                            key={range}
                            onClick={() => handleAnswer("priceRange", range)}
                            className="py-2 px-1 bg-gradient-to-r text-xs from-indigo-300 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transition-all"
                          >
                            {range === "low"
                              ? "Under $50"
                              : range === "medium"
                              ? "$50 - $100"
                              : "Above $100"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-lg font-semibold text-gray-800">
                    Top Recommendations:
                  </p>
                  {recommendedProducts.length > 0 ? (
                    <div className="space-y-3">
                      {recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-md"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div>
                            <p className="text-xs font-semibold text-gray-800">
                              {product.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No recommendations found based on your choices.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={handleClearSelection}
                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-all"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
