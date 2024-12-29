"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
            <Footer />
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
