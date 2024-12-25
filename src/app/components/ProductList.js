"use client";

import { useState, useEffect } from "react";
import FilterSort from "../components/FilterSort";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSort, setFilterSort] = useState({ category: "All", sort: "" });

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
    // Apply filtering and sorting
    let updatedProducts = [...products];

    // Filter by category
    if (filterSort.category && filterSort.category !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filterSort.category
      );
    }

    // Sort by price
    if (filterSort.sort === "price_low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (filterSort.sort === "price_high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [filterSort, products]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
