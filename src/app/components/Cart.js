"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-6 my-28 bg-gray-100 rounded-lg shadow-lg">
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl font-semibold text-gray-700">
            Your cart is empty!
          </p>
          <p className="text-gray-500 mt-2">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cart Items
            </h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="border border-gray-300 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="border border-gray-300 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="border px-2 py-1 rounded-lg text-red-500 hover:text-white hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cart Summary
            </h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Total:</span>
              <span className="text-xl font-semibold text-gray-800">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link href="/checkout">
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 mb-4">
                Proceed to Checkout
              </button>
            </Link>

            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
