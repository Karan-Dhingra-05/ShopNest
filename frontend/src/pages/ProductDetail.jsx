import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    alert("Successfully added to your cart!");
  };

  if (loading) {
    return (
      <div className="mt-24 text-center text-lg font-semibold text-orange-500">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-24 text-center text-lg font-semibold text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-zinc-400">
        <Link to="/" className="text-orange-500 hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="text-orange-500 hover:underline">
          Shop
        </Link>{" "}
        / {product.category} /{" "}
        <span className="text-white">{product.name}</span>
      </div>

      {/* Product */}
      <div className="grid gap-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 lg:grid-cols-2">
        {/* Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-xl object-cover shadow-2xl"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-3 text-5xl font-bold text-white">{product.name}</h1>

          <p className="mb-6 text-4xl font-bold text-orange-500">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="mb-8">
            <h3 className="mb-3 text-xl font-semibold text-white">
              Product Description
            </h3>

            <p className="leading-8 text-zinc-400">{product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-lg bg-orange-500 px-8 py-4 text-lg hover:cursor-pointer font-semibold text-white transition duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
          >
            Add to Shopping Cart
          </button>

          <p
            className={`mt-6 text-lg font-semibold ${
              product.stock > 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : "● Temporarily Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
