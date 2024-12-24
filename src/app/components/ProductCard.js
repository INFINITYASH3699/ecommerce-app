"use client";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-60 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <Link
        href={`/pages/details?id=${product.id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
