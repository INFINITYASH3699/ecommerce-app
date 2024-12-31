"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get addToCart from CartContext
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  // Toggle wishlist status
  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the icon
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="relative border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Wishlist Icon */}
      <div
        onClick={toggleWishlist}
        className="absolute top-4 right-4 cursor-pointer z-10"
      >
        <FaHeart
          className={`text-xl ${
            isInWishlist ? "text-red-500" : "text-gray-300"
          }`}
        />
      </div>

      {/* Product Details */}
      <Link href={`/pages/details?id=${product.id}`} className="flex-grow">
        <div className="relative w-full h-60 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            priority={true}
            style={{
              objectFit: "contain",
            }}
            className="w-full h-48 mb-4"
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
        <h2 className="text-sm mb-2 truncate">{product.category}</h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
