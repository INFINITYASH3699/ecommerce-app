# E-commerce App

This project is an E-commerce web application built using **Next.js** and **Tailwind CSS**. It provides a seamless shopping experience with features like product filtering, sorting, and a dynamic cart. Below are the setup instructions and a brief explanation of the implemented features.

---

## Setup Instructions

### Prerequisites

1. **Node.js** (v16 or above) must be installed.
2. **npm** or **yarn** package manager.

### Steps to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/INFINITYASH3699/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

5. Build for production:

   ```bash
   npm run build
   npm start
   ```

---

## Features Implemented

### 1. **Product Listing**

- Displays a list of products fetched from an external API.
- Each product shows an image, title, price, and a brief description.

### 2. **Filter and Sort**

- **Category Filter:** Users can filter products by categories such as electronics, jewelery, men’s clothing, and women’s clothing.
- **Sort Options:** Products can be sorted by price (low to high or high to low).
- Mobile-friendly design with a dropdown that expands below the "Filter & Sort" button.

### 3. **Product Details**

- Clicking on a product redirects to a detailed page.
- The detailed view includes:
  - High-quality product image.
  - Full description and price.
  - "Add to Cart" button with real-time cart updates.

### 4. **Shopping Cart**

- Real-time cart updates when products are added.
- Cart contents are stored in the browser’s local storage to persist across sessions.

### 5. **Responsive Design**

- Fully responsive UI optimized for mobile, tablet, and desktop devices.

---

## Technology Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **API:** FakeStore API

---

## Future Improvements

- Implement user authentication for personalized experiences.
- Add a checkout process with payment integration.
- Optimize images using Next.js image optimization features.

---

## Acknowledgments

Special thanks to the [FakeStore API](https://fakestoreapi.com/) for providing the product data.

