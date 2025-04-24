"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaShoppingCart,
  FaSearch,
  FaTimes,
  FaUserCircle,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { cartCount } = useCart();
  const { setSearchQuery } = useSearch();
  const { user, logout } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect to toggle shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchInputChange = (e) => setSearchInput(e.target.value);

  const handleSearch = () => setSearchQuery(searchInput);

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full px-5 ${
        isScrolled ? "py-2" : "py-5"
      } bg-blue-600 text-white flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled ? "shadow-xl" : ""
      }`}
    >
      {/* Logo */}
      <Link href="/">
        <h1 className="text-sm md:text-3xl font-bold font-roboto cursor-pointer tracking-wide">
          Infinity Store
        </h1>
        <h1 className="hidden md:block text-sm md:text-md font-bold cursor-pointer tracking-wide font-curly">
          An E-Commerce platform
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="flex items-center bg-white text-black rounded shadow-md w-[40%] md:w-[40%]">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search products..."
          className="w-full p-3 text-sm md:text-lg rounded-l-full focus:outline-none"
        />
        {searchInput && (
          <button
            onClick={handleClearSearch}
            className="p-3 text-gray-600 hover:text-red-500 duration-200"
          >
            <FaTimes size={20} />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="p-3 text-blue-600 rounded-r-full hover:text-blue-900 transition duration-200"
        >
          <FaSearch size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <Link href="/cart">
          <div className="relative cursor-pointer mr-0">
            <FaShoppingCart size={28} className="" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        <Link href="/wishlist">
          <div className="relative cursor-pointer mr-0">
            <FaHeart size={28} />
          </div>
        </Link>

        {/* User Authentication */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-sm font-medium">
              {user.email}
            </div>
            <button onClick={handleLogout} className="p-1 hover:text-red-300">
              <FaSignOutAlt size={24} />
            </button>
          </div>
        ) : (
          <Link href="/auth/login">
            <div className="flex items-center gap-1 cursor-pointer">
              <FaUserCircle size={28} />
              <span className="hidden md:block">Login</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
