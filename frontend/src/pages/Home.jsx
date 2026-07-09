import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div
        className="
    relative overflow-hidden
    mb-12 rounded-2xl
    border border-white/5
    px-8 py-24
    text-center
    shadow-2xl
    bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_60%),linear-gradient(135deg,#18181b_0%,#09090b_100%)]
  "
      >
        <h1 className="mb-5 text-6xl font-bold text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">
          Welcome to ShopNest
        </h1>

        <p className="text-xl text-zinc-300">
          Discover the best products at unbeatable prices.
        </p>
      </div>

      <h2 className="mb-8 text-3xl font-bold text-white">Featured Products</h2>

      {loading ? (
        <div className="text-center text-zinc-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
