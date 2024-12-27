
import "./styles/globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

export const metadata = {
  title: "E-Commerce App",
  description: "Simple E-Commerce App with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
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
