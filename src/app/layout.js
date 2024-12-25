"use client";

import "./styles/globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext"; // Context for managing cart
import { SearchProvider } from "./context/SearchContext"; // Context for search

// export const metadata = {
//   title: "E-Commerce App",
//   description: "Simple E-Commerce App with Next.js",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Provide Context Globally */}
        <CartProvider>
          <SearchProvider>
            {/* Header is now global */}
            <Header />
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
