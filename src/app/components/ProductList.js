"use client";

import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import FilterSort from "../components/FilterSort";
import ProductCard from "../components/ProductCard";
import Chatbot from "../components/Chatbot";
import {
  fetchProducts,
  fetchProductsByCategory,
  sortProductsByPrice
} from "../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSort, setFilterSort] = useState({ category: "All", sort: "" });
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const { searchQuery } = useSearch();

  // Fetch products from API
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        let data;

        if (filterSort.category !== "All") {
          // Fetch products by category if a specific category is selected
          data = await fetchProductsByCategory(filterSort.category);
        } else {
          // Fetch all products
          data = await fetchProducts();
        }

        // Apply search filter if there's a search query
        if (searchQuery) {
          data = data.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply sorting if needed
        if (filterSort.sort) {
          const sortOrder = filterSort.sort === 'price_low' ? 'asc' : 'desc';
          data = sortProductsByPrice(data, sortOrder);
        }

        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    getProducts();
  }, [filterSort.category, filterSort.sort, searchQuery]);

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
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Category and Filter Section */}
      <div className="mb-8">
        <FilterSort
          onFilterSortChange={setFilterSort}
          currentCategory={filterSort.category}
        />
      </div>

      {/* Recommended Products Section */}
      {hasRecommendations && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Recommended for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* All Products Section */}
      {filteredWithoutRecommendations.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            {filterSort.category === "All" ? "All Products" : filterSort.category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredWithoutRecommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-xl font-semibold text-gray-500">
            No products available based on your filter.
          </p>
        </div>
      )}

      {/* Chatbot Component */}
      <Chatbot products={products} setRecommendedProducts={setRecommendedProducts} />
    </div>
  );
};

export default ProductList;
