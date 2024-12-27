"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "../context/CartContext"; // Import Cart Context

// Your ProductDetails component
function ProductDetailsComponent() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { addToCart } = useCart(); // Access addToCart function from context

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };
    if (id) fetchProductDetails();
  }, [id]);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Use addToCart from CartContext
      alert(`${product.title} added to cart!`);
    }
  };

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

  // Error handling state
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // If product is not found
  if (!product) {
    return <p className="text-center">Product not found.</p>;
  }

  // Render product details
  return (
    <div className="max-w-4xl mx-auto p-4 my-8 mt-28">
      <div className="flex flex-col md:flex-row gap-28">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg"
            onError={(e) => e.target.src = "/fallback-image.png"} // Fallback image
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg text-gray-700 mb-4">{product.category}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <button
            onClick={handleAddToCart} // Add to cart button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsComponent />
    </Suspense>
  );
}
