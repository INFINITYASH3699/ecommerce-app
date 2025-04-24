"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Zoom from "react-medium-image-zoom";
import { FaHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { fetchProductById } from "../utils/api";
import Link from "next/link";

function ProductDetailsComponent() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useAuth();

  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const isInWishlist = product ? wishlist.some((item) => item.id === product.id) : false;

  // Toggle wishlist status
  const toggleWishlist = (e) => {
    e.preventDefault();
    if (!product) return;
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const { addToCart } = useCart();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        setProduct(productData);

        // Mock reviews data
        setReviews([
          { name: "Alice", comment: "Great product!", rating: 5 },
          { name: "Bob", comment: "Satisfactory quality.", rating: 4 },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };
    if (id) getProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      alert(`${quantity} x ${product.title} added to cart!`);
    }
  };

  const handleQuantityChange = (value) => {
    if (value > 0) setQuantity(value);
  };

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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <p className="text-center">Product not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 my-10 mt-28 bg-white shadow-lg rounded-lg">
      {/* Back button */}
      <Link
        href="/"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2 relative">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Zoom>
              <img
                src={product.image}
                alt={product.title}
                className="rounded-lg object-contain"
                style={{ width: "100%", maxHeight: "400px" }}
              />
            </Zoom>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-4 md:pr-10">
                {product.title}
              </h1>
              <button
                onClick={toggleWishlist}
                className="text-2xl flex-shrink-0"
              >
                <FaHeart
                  className={`${
                    isInWishlist ? "text-red-500" : "text-gray-300"
                  }`}
                />
              </button>
            </div>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>
            <p className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full mb-4">
              {product.category}
            </p>
            <p className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>

            {/* User review prompt */}
            {user && (
              <div className="mt-4 text-sm text-blue-600">
                Purchased this item? Leave a review!
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <label htmlFor="quantity" className="text-gray-700 font-semibold">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              min="1"
              className="w-16 border border-gray-300 rounded-lg px-3 py-1 text-center"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>

          <button
            onClick={() => alert("View similar products feature coming soon!")}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            View Similar Products
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 font-bold">{review.name}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-yellow-500 font-semibold">
                  {"⭐".repeat(review.rating)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
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
