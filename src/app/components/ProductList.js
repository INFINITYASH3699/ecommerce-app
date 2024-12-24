"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import FilterSort from "../components/FilterSort";

const ProductList = () => {
  // State for products and filters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSort, setFilterSort] = useState({ category: "", sort: "" });

  // Fetch products from API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Handle filter and sort changes
  const handleFilterSortChange = ({ category, sort }) => {
    let updatedProducts = [...products];

    // Filter by category
    if (category && category !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }

    // Sort by price
    if (sort === "price_low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {/* Filter and Sort Component */}
      <FilterSort onFilterSortChange={handleFilterSortChange} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
