import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you strictly sure you want to delete this?")) {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-orange-500">Manage Products</h2>

        <Link
          to="/admin/add-product"
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                ID
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Name
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Price
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Category
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Stock
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="px-5 py-4 text-white">
                    {product._id.substring(0, 8)}...
                  </td>

                  <td className="px-5 py-4 font-medium text-white">
                    {product.name}
                  </td>

                  <td className="px-5 py-4 font-semibold text-orange-500">
                    ₹{product.price.toFixed(2)}
                  </td>

                  <td className="px-5 py-4 text-zinc-300">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 text-zinc-300">{product.stock}</td>

                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-zinc-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
