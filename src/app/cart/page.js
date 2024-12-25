"use client";

import Cart from "../components/Cart";

export default function CartPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Shopping Cart</h1>
      <Cart />
    </div>
  );
}
