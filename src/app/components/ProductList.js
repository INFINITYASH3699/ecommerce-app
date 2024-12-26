"use client";

import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext"; // Import Search Context
import FilterSort from "../components/FilterSort";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSort, setFilterSort] = useState({ category: "All", sort: "" });

  const { searchQuery } = useSearch(); // Use search query context

  useEffect(() => {
    // Fetch products from a public API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <FilterSort onFilterSortChange={setFilterSort} />
      {filteredProducts.length === 0 ? (
        // Display "No Results Found" message in center
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-4xl font-semibold text-gray-500">Product / Item not yet listed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
