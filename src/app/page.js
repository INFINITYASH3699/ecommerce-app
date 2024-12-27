"use client";

import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="container mx-auto p-4 mt-24">
      <h1 className="text-4xl font-bold text-center my-2">Product List</h1>
      <ProductList />
    </div>
  );
}
