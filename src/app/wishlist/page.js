// src\app\pages\wishlist.js
"use client";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineShoppingCart, HiTrash } from "react-icons/hi";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();
  const [removingItem, setRemovingItem] = useState(null);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Your wishlist is empty!
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const handleRemove = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeFromWishlist(id);
      setRemovingItem(null);
    }, 1000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleProductClick = (id) => {
    router.push(`/pages/details?id=${id}`); // Navigate to the product details page
  };

  return (
    <div className="container mx-auto px-4 my-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 mt-28">
        My Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="relative border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:shadow-xl overflow-hidden"
          >
            <div
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={250}
                height={250}
                className="object-fit w-full p-8 h-72 transition-transform transform"
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-44">
              <div className="">
                <h3
                  className="text-lg font-semibold text-gray-800 mb-2 hover:underline"
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.title}
                </h3>
                <p className="text-gray-500 mb-4">${product.price}</p>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 hover:bg-blue-700 flex items-center space-x-2"
                >
                  <HiOutlineShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  disabled={removingItem === product.id}
                  className={`${
                    removingItem === product.id
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 text-white"
                  } py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 hover:bg-red-600 flex items-center space-x-2`}
                >
                  <HiTrash className="w-5 h-5" />
                  <span>
                    {removingItem === product.id ? "Removing..." : "Remove"}
                  </span>
                </button>
              </div>
            </div>
            {removingItem === product.id && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-lg">
                <p className="text-white text-sm">Processing...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
