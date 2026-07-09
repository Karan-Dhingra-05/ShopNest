import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <h2 className="mb-8 text-4xl font-bold text-white">All Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
      />

      {loading ? (
        <div className="mt-16 text-center text-lg font-semibold text-orange-500">
          Loading...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-16 text-center text-lg text-zinc-400">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
