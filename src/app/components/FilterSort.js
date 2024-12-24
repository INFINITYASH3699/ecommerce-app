"use client";

import { useState } from "react";

const FilterSort = ({ onFilterSortChange }) => {
  // States for filters and sorting
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // Categories for filtering
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  // Handle filter and sort changes
  const handleFilterSortChange = () => {
    onFilterSortChange({ category, sort });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      {/* Filter Dropdown */}
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

      {/* Sort Dropdown */}
      <div>
        <label className="text-sm font-semibold mr-2">Sort By:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">None</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleFilterSortChange}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterSort;
