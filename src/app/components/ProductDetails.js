"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the product ID from the URL query

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-8">Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-cover rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <button className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
