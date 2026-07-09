import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status } : order))
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Manage Orders</h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold text-zinc-400 uppercase">
                Order ID
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-zinc-400 uppercase">
                User
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-zinc-400 uppercase">
                Total
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-zinc-400 uppercase">
                Date
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-zinc-400 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="px-5 py-4 text-white">
                    {order._id.substring(0, 8)}...
                  </td>

                  <td className="px-5 py-4 text-white">
                    {order.userId?.name || "Deleted User"}
                  </td>

                  <td className="px-5 py-4 text-orange-500 font-semibold">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>

                  <td className="px-5 py-4 text-zinc-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-zinc-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
