// API integration functions

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Search products by query
export const searchProducts = async (query) => {
  try {
    const allProducts = await fetchProducts();
    const normalizedQuery = query.toLowerCase();

    return allProducts.filter(product =>
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

// Sort products by price (low to high or high to low)
export const sortProductsByPrice = (products, sortOrder = 'asc') => {
  const sortedProducts = [...products];

  if (sortOrder === 'asc') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  } else {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }
};
