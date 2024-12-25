"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaSearch } from "react-icons/fa"; // Import search icon
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

const Header = () => {
  const { cartCount } = useCart(); // Get cart count from context
  const { setSearchQuery } = useSearch(); // Get search query handler
  const [searchInput, setSearchInput] = useState(""); // Local state for search input

  // Handle search input
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search submission
  const handleSearch = () => {
    setSearchQuery(searchInput); // Update global query when the search icon is clicked
  };

  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">E-Commerce</h1>
      </Link>

      {/* Search Bar */}
      <div className="flex items-center bg-white text-black rounded p-2">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search products..."
          className=" rounded-l w-56 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-r flex items-center justify-center"
        >
          <FaSearch size={16} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
