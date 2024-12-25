"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function Cart() {
  const { cart, total, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart(); // Access cart context

  return (
    <div className="max-w-4xl mx-auto p-4">
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
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
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="border px-3 py-1 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="border px-2 py-1 rounded-lg text-red-500 hover:text-white hover:bg-red-600 duration-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 text-right">
            <h2 className="text-xl font-semibold">Total: ${total}</h2>
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
