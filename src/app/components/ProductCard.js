"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  // Format category name for display
  const formatCategory = (category) => {
    return category.split(" ").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  // Toggle wishlist status
  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm opacity-70 hover:opacity-100"
      >
        <FaHeart
          className={`${
            isInWishlist ? "text-red-500" : "text-gray-400"
          } text-lg`}
        />
      </button>

      {/* Product Image and Details */}
      <Link href={`/pages/details?id=${product.id}`} className="block">
        <div className="h-48 sm:h-56 p-4 flex items-center justify-center bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            width={120}
            height={120}
            priority={true}
            style={{
              objectFit: "contain",
              maxHeight: "100%",
              width: "auto",
            }}
            className="h-full max-h-40 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <div className="mb-1">
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {formatCategory(product.category)}
            </span>
          </div>
          <h3 className="text-sm font-semibold mb-1 line-clamp-2 h-10">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
