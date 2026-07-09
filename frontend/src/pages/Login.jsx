import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-[420px] flex-col gap-5 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Animated Top Border */}
        <div className="absolute top-0 left-[-50%] h-1 w-[200%] animate-shimmer bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          Login
        </h2>

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
          className="rounded-lg bg-orange-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
        >
          Login
        </button>

        <p className="mt-4 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
