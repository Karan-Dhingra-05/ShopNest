import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/auth/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto my-10 bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">
        User Directory
      </h2>

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
                Email
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Role
              </th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                >
                  <td className="px-5 py-4 text-white">
                    {u._id.substring(0, 8)}...
                  </td>

                  <td className="px-5 py-4 font-medium text-white">{u.name}</td>

                  <td className="px-5 py-4 text-zinc-300">{u.email}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-md px-3 py-1 text-xs font-bold uppercase ${
                        u.role === "admin"
                          ? "bg-orange-500/20 text-orange-500"
                          : "bg-emerald-500/20 text-emerald-500"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-zinc-300">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-zinc-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
