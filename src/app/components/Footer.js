"use client";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center md:grid md:grid-cols-3 md:gap-8 text-center">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Infinity Store</h2>
            <p>
              Your one-stop shop for everything! Explore top-quality products
              with seamless shopping experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-gray-200 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-200 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-gray-200 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-gray-200 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Infinity Ecom, Pune City</p>
            <p>Email: support@infinitystore.com</p>
            <p>Phone: +91 9665187273</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-400 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Infinity Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
