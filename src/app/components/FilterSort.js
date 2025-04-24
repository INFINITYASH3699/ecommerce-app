"use client";

import { useState, useEffect } from "react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import { fetchCategories } from "../utils/api";

const FilterSort = ({ onFilterSortChange, currentCategory = "All" }) => {
  const [category, setCategory] = useState(currentCategory);
  const [sort, setSort] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories from API
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
        setCategories(["All", ...fetchedCategories]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([
          "All",
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing"
        ]);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    onFilterSortChange({ category, sort });
  }, [category, sort, onFilterSortChange]);

  useEffect(() => {
    if (currentCategory !== category) {
      setCategory(currentCategory);
    }
  }, [currentCategory]);

  const toggleDropdown = () => setIsExpanded(!isExpanded);

  // Format category name for display
  const formatCategory = (category) => {
    if (category === "All") return "All Products";
    return category
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return <div className="flex justify-center py-4">Loading categories...</div>;
  }

  return (
    <div className="mb-6">
      <div className="hidden md:flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {formatCategory(cat)}
          </button>
        ))}
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={toggleDropdown}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md flex items-center gap-2"
        >
          <FaFilter /> Filter & Sort
        </button>
      </div>

      {/* Dropdown for Mobile */}
      {isExpanded && (
        <div className="md:hidden bg-white rounded-lg p-4 border mb-4 shadow-md">
          {/* Categories */}
          <div className="mb-4">
            <label className="text-sm font-bold block mb-2">Category:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    category === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {cat === "All" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="text-sm font-bold block mb-2">Sort By:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-lg w-full"
            >
              <option value="">Default</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Desktop Sort Section */}
      <div className="hidden md:flex justify-end items-center">
        <div className="flex items-center gap-2">
          <FaSortAmountDown className="text-gray-500" />
          <label className="text-sm font-semibold">Sort By:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded-lg bg-white"
          >
            <option value="">Default</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
