"use client";

import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import FilterSort from "../components/FilterSort";
import { getProducts } from "../utils/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on page load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts(); // Fetch data from API
        setProducts(data); // Store in state
        setFilteredProducts(data); // Default filtered products
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Handle filtering and sorting
  const handleFilterSort = (filtered) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center flex items-center space-x-2">
          <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <FilterSort products={products} onFilterSort={handleFilterSort} />
      <ProductList products={filteredProducts} />
    </div>
  );
}
