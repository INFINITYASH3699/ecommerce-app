"use client";

import { useState, useEffect } from "react";

const FilterSort = ({ onFilterSortChange }) => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

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

  return (
    <div className="flex flex-col md:flex-row justify-end items-center mb-6 gap-4">
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
  );
};

export default FilterSort;
