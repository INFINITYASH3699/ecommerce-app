"use client";

import React, { createContext, useContext, useState } from "react";

// Create Search Context
const SearchContext = createContext();

// Custom Hook
export const useSearch = () => useContext(SearchContext);

// Context Provider
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
