import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:ring-1 hover:ring-orange-500/30">
      <div className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between bg-linear-to-t from-zinc-900 to-transparent p-5">
        <div>
          <h3 className="mb-2 truncate text-lg font-semibold text-white">
            {product.name}
          </h3>

          <p className="mb-4 text-2xl font-bold text-orange-500">
            ₹{product.price}
          </p>
        </div>

        <Link
          to={`/product/${product._id}`}
          className="rounded-lg bg-orange-500 px-4 py-2 text-center font-medium text-white transition hover:bg-orange-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
