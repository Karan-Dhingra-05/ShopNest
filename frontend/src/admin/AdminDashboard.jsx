import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <ShoppingBag
          className=" text-orange-500 w-12 h-12 rounded-lg object-cover drop-shadow-[0_0_10px_rgba(249,115,22,0.35)]"
          size={32}
        />

        <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      </div>

      <p className="text-zinc-400 text-lg mb-8">
        Welcome back,{" "}
        <span className="text-white font-semibold">{user?.name}</span>
      </p>

      {/* Stats */}
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg text-center">
            <h4 className="text-zinc-400 text-sm uppercase tracking-wide">
              Total Orders
            </h4>
            <p className="text-4xl font-bold text-orange-500 mt-3">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg text-center">
            <h4 className="text-zinc-400 text-sm uppercase tracking-wide">
              Total Products
            </h4>
            <p className="text-4xl font-bold text-orange-500 mt-3">
              {stats.totalProducts}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg text-center">
            <h4 className="text-zinc-400 text-sm uppercase tracking-wide">
              Total Users
            </h4>
            <p className="text-4xl font-bold text-orange-500 mt-3">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg text-center">
            <h4 className="text-zinc-400 text-sm uppercase tracking-wide">
              Total Revenue
            </h4>
            <p className="text-4xl font-bold text-orange-500 mt-3">
              ₹{stats.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-orange-500 text-lg">
          Loading metrics...
        </div>
      )}

      {/* Controls */}
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-orange-500 mb-6">
          Administrative Controls
        </h3>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            + Add Product
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            📦 Manage Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            🚚 Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            👥 Users Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
