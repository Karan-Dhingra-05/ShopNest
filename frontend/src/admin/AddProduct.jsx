import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image");
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        alert("Product created successfully with Cloudinary Image URL!");
        navigate("/shop");
      } else {
        alert(responseData.message || "Error creating product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Product Name"
          required
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <textarea
          rows={4}
          placeholder="Description"
          required
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          required
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          required
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          required
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />

        <div className="border-2 border-dashed border-orange-500 rounded-lg p-5">
          <label className="block text-zinc-400 mb-3 font-medium">
            Upload Product Image (Cloudinary)
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-zinc-300
              file:mr-4
              file:px-4
              file:py-2
              file:rounded-md
              file:border-0
              file:bg-orange-500
              file:text-white
              hover:file:bg-orange-600
              cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {loading ? "Uploading & Creating..." : "Publish Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
