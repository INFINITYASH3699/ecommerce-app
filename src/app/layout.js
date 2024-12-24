import "./styles/globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "E-commerce Store",
  description: "A simple e-commerce app built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans antialiased">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
