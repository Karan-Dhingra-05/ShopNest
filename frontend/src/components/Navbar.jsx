import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 px-5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white"
          >
            <ShoppingBag className="mx-auto text-orange-500" size={32} />

            <span>
              ShopNest
              <span className="text-3xl text-orange-500">.</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap items-center gap-7">
          <li>
            <Link
              to="/shop"
              className="relative text-sm font-medium text-zinc-400 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all hover:after:w-full"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="relative text-sm font-medium text-zinc-400 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all hover:after:w-full"
            >
              Cart ({cartItems.length})
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="relative text-sm font-medium text-zinc-400 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all hover:after:w-full"
                >
                  Hi, {user.name}
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="relative text-sm font-medium text-zinc-400 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all hover:after:w-full"
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-red-500/30 px-4 py-2 font-semibold text-red-500 transition-all hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="relative text-sm font-medium text-zinc-400 transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all hover:after:w-full"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
