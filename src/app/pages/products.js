import ProductList from "../components/ProductList";

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Shop Our Products</h1>
      <ProductList />
    </div>
  );
}
