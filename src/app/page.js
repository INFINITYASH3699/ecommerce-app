"use client";

import ProductList from "./components/ProductList";
import { useSearch } from "./context/SearchContext"; // Get search context

export default function Home() {
  const { searchQuery } = useSearch(); // Access search query globally

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6">Product List</h1>
      {/* Pass search query */}
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
