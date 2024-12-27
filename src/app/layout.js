"use client";

import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SearchProvider>
            <Header />
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
