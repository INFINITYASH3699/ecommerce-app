"use client";

import { useState, useEffect } from "react";
import { FaRobot, FaTimes, FaUndo } from "react-icons/fa";

const Chatbot = ({ products, setRecommendedProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ category: "", priceRange: "" });
  const [recommendedProducts, setRecommendedProductsState] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [inactivityReminder, setInactivityReminder] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [hasDismissedReminder, setHasDismissedReminder] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      resetChatbot();
    } else {
      setLastInteractionTime(Date.now());
    }
  };

  const resetChatbot = () => {
    setStep(1);
    setAnswers({ category: "", priceRange: "" });
    setShowRecommendations(false);
    setInactivityReminder(false);
    setNoProductsFound(false);
  };

  const handleClearSelection = () => {
    resetChatbot();
    setRecommendedProducts([]);
    setHasDismissedReminder(false);
  };

  useEffect(() => {
    if (isOpen && !hasDismissedReminder) {
      const timer = setInterval(() => {
        if (Date.now() - lastInteractionTime >= 5000) {
          setInactivityReminder(true);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lastInteractionTime, hasDismissedReminder, isOpen]);

  const handleAnswer = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setLastInteractionTime(Date.now());
    setInactivityReminder(false);

    if (key === "category") {
      setStep(2);
    }
  };

  const handleBackToCategories = () => {
    setAnswers({ ...answers, priceRange: "" });
    setStep(1);
    setNoProductsFound(false);
  };

  const handleBackToPriceRanges = () => {
    setAnswers({ ...answers, priceRange: "" });
    setStep(2);
    setNoProductsFound(false);
    setShowRecommendations(false);
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

      if (filteredProducts.length > 0) {
        setShowRecommendations(true);
        setNoProductsFound(false);
      } else {
        setShowRecommendations(false);
        setNoProductsFound(true);
      }
    } else {
      setShowRecommendations(false);
      setNoProductsFound(false);
    }
  }, [answers, products, setRecommendedProducts]);

  const getPriceRangeText = (range) => {
    return range === "low"
      ? "Under $50"
      : range === "medium"
        ? "$50 - $100"
        : "Above $100";
  };

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
      {inactivityReminder && isOpen && !hasDismissedReminder && (
        <div className="absolute top-14 right-4 z-50">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-yellow-700">
                Can I help you choose something?
              </p>
              <button
                onClick={() => {
                  setInactivityReminder(false);
                  setHasDismissedReminder(true);
                }}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[400px] bg-white rounded-xl shadow-lg p-4 border border-indigo-400 z-50">
          <div className="flex flex-col h-full">
            <div className="flex justify-center items-center mb-4 pb-2 border-b border-gray-200">
              <div className="text-lg font-semibold text-indigo-600">
                Product Finder
              </div>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 px-1">
              {!showRecommendations && !noProductsFound ? (
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
                            className={`py-2 px-1 text-xs text-white rounded-lg shadow-md hover:scale-105 transition-all ${
                              answers.category === category
                                ? "bg-indigo-600"
                                : "bg-gradient-to-r from-indigo-300 to-indigo-500"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <div className="flex items-center mb-4">
                        <button
                          onClick={handleBackToCategories}
                          className="mr-2 text-indigo-500 hover:text-indigo-700"
                          title="Back to categories"
                        >
                          <FaUndo size={14} />
                        </button>
                        <p className="text-base font-medium text-gray-700">
                          What price range are you looking for?
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {["low", "medium", "high"].map((range) => (
                          <button
                            key={range}
                            onClick={() => handleAnswer("priceRange", range)}
                            className="py-2 px-1 bg-gradient-to-r text-xs from-indigo-300 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transition-all"
                          >
                            {getPriceRangeText(range)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : noProductsFound ? (
                <div className="text-center">
                  <div className="py-6 px-4 bg-gray-50 rounded-lg mb-4">
                    <p className="text-base font-medium text-gray-700 mb-2">
                      No products found in {answers.category} within the{" "}
                      {getPriceRangeText(answers.priceRange)} price range.
                    </p>
                    <p className="text-sm text-gray-600">
                      Would you like to try a different selection?
                    </p>
                  </div>
                  <div className="space-x-3">
                    <button
                      onClick={handleBackToCategories}
                      className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200 transition-all"
                    >
                      Change Category
                    </button>
                    <button
                      onClick={handleBackToPriceRanges}
                      className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-all"
                    >
                      Change Price
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-semibold text-gray-800">
                      Top Recommendations:
                    </p>
                    <button
                      onClick={handleBackToPriceRanges}
                      className="text-indigo-500 hover:text-indigo-700"
                      title="Change selection"
                    >
                      <FaUndo size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recommendedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-xs font-semibold text-gray-800">
                            {product.title.length > 40
                              ? `${product.title.substring(0, 40)}...`
                              : product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-2 border-t border-gray-200 text-center">
              <button
                onClick={handleClearSelection}
                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
