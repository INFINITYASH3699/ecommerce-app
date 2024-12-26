"use client";

import { useState, useEffect } from "react";

const FilterSort = ({ onFilterSortChange }) => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle the dropdown

  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    onFilterSortChange({ category, sort });
  }, [category, sort, onFilterSortChange]);

  const toggleDropdown = () => setIsExpanded(!isExpanded);

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-md"
        >
          Filter & Sort
        </button>
      </div>

      {/* Dropdown Section */}
      {isExpanded && (
        <div className="rounded-md p-4 border mb-2">
          {/* Filter Section */}
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-2">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Section */}
          <div>
            <label className="text-sm font-semibold block mb-2">Sort By:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="">Any</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Desktop Filter & Sort Section */}
      <div className="hidden md:flex flex-col md:flex-row justify-end items-center mb-6 gap-4">
        <div>
          <label className="text-sm font-semibold mr-2">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold mr-2">Sort By:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Any</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
