# Infinity Store E-Commerce

A modern e-commerce application built with Next.js and the Fake Store API. This project demonstrates a functional e-commerce platform with features including product browsing, filtering, cart management, wishlists, user authentication, and checkout.

## Features

- **Product Browsing**: View products from different categories
- **Product Search**: Search products by name or description
- **Product Filtering**: Filter products by category
- **Product Sorting**: Sort products by price (low to high or high to low)
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add products to cart, manage quantities, and calculate totals
- **Wishlist**: Save products to a wishlist for later
- **User Authentication**: Register and login using Firebase Authentication
- **Checkout Process**: Simple checkout process with shipping and payment information
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **API**: Fake Store API
- **State Management**: React Context API
- **Routing**: Next.js App Router
- **Image Handling**: Next.js Image component
- **Icons**: React Icons

## Setup Instructions

### Prerequisites

1. **Node.js** (v16 or above) must be installed.
2. **npm**, **yarn**, or **bun** package manager.

### Steps to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/INFINITYASH3699/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for easy deployment on Netlify. The `netlify.toml` file contains the necessary configuration.

## Project Structure

- `/src/app` - Main application code
  - `/components` - Reusable UI components
  - `/context` - React Context providers for state management
  - `/utils` - Utility functions and API handlers
  - `/auth` - Authentication pages (login/signup)
  - `/lib` - Firebase and other library configurations
  - `/cart` - Shopping cart page
  - `/checkout` - Checkout page
  - `/wishlist` - Wishlist page

## API Integration

The application uses the [Fake Store API](https://fakestoreapi.com/) to fetch product data. The API integration is handled in the `/src/app/utils/api.js` file, which provides functions for:

- Fetching all products
- Fetching products by category
- Fetching product details
- Searching products
- Sorting products

## Firebase Authentication

User authentication is handled using Firebase Authentication. The configuration is in `/src/app/lib/firebase.js`, and the auth context in `/src/app/context/AuthContext.js` provides:

- User registration
- User login
- User logout
- Auth state tracking

## Acknowledgments

Special thanks to the [Fake Store API](https://fakestoreapi.com/) for providing the product data.
