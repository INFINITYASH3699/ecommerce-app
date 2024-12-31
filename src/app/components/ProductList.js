"use client";

import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext"; // Import Search Context
import FilterSort from "../components/FilterSort";
import ProductCard from "../components/ProductCard";
import Chatbot from "../components/Chatbot"; // Import Chatbot Component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSort, setFilterSort] = useState({ category: "All", sort: "" });
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const { searchQuery } = useSearch(); // Use search query context

  // Fetch products from a public API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products based on user input
  useEffect(() => {
    let updatedProducts = [...products];

    // Apply search filter
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterSort.category && filterSort.category !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filterSort.category
      );
    }

    // Apply price sorting
    if (filterSort.sort === "price_low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (filterSort.sort === "price_high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, filterSort, products]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center flex items-center space-x-2">
          <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Remove recommended products from filtered products to avoid duplication
  const filteredWithoutRecommendations = filteredProducts.filter(
    (product) => !recommendedProducts.some((recommended) => recommended.id === product.id)
  );

  const hasRecommendations = recommendedProducts.length > 0;

  return (
    <div className="container mx-auto p-4">
      {/* Filter and Sort Options */}
      <FilterSort onFilterSortChange={setFilterSort} />

      {/* Product List */}
      {hasRecommendations && (
        <div className="col-span-full mb-6">
          <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* If there are no recommendations, show All Products text */}
      {!hasRecommendations && filteredWithoutRecommendations.length === 0 && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-4xl font-semibold text-gray-500">
            No products available based on your filter.
          </p>
        </div>
      )}

      {/* Display remaining products if no recommendations are active */}
      {!hasRecommendations && (
        <div>
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWithoutRecommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Chatbot Component */}
      <Chatbot products={products} setRecommendedProducts={setRecommendedProducts} />
    </div>
  );
};

export default ProductList;
