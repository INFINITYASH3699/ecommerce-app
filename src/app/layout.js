"use client";

import "@/styles/globals.css";
import Header from "@/components/Header"; // Use absolute imports
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

export const metadata = {
  title: "E-Commerce App",
  description: "Simple E-Commerce App with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="antialiased">
        <CartProvider>
          <SearchProvider>
            <Header />
            <main>{children}</main>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
