import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message);
      }

      alert(data.message);

      localStorage.setItem("verifyEmail", data.email);

      navigate("/verify-otp");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-5"
      >
        {/* Animated Top Border */}
        <div className="absolute top-0 left-[-50%] h-1 w-[200%] animate-shimmer bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />

        <button
          type="submit"
          className="rounded-lg bg-orange-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
        >
          Register
        </button>

        <p className="mt-4 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
