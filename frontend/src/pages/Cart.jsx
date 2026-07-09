import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <h2 className="mb-8 text-4xl font-bold text-white">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-zinc-400">
          Your cart is empty.{" "}
          <Link
            to="/shop"
            className="font-semibold text-orange-500 hover:underline"
          >
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left */}
          <div className="flex flex-[2] flex-col gap-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col rounded-xl border border-white/5 bg-zinc-900 p-5 shadow-lg transition-all duration-300 hover:translate-x-1 hover:border-orange-500/30 md:flex-row md:items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="mb-5 h-32 w-32 rounded-lg object-cover md:mb-0 md:mr-8"
                />

                <div className="flex-1">
                  <h4 className="mb-2 text-xl font-semibold text-white">
                    {item.name}
                  </h4>

                  <p className="mb-4 text-lg font-semibold text-orange-500">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="mb-5 flex items-center gap-4">
                    <button
                      onClick={() => handleUpdateQty(item, item.qty - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-white transition hover:border-orange-500 hover:bg-orange-500 hover:cursor-pointer"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold text-white">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => handleUpdateQty(item, item.qty + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-white transition hover:border-orange-500 hover:bg-orange-500 hover:cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white hover:cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="sticky top-24 h-fit flex-1 rounded-xl border border-white/5 bg-zinc-900 p-8 shadow-lg">
            <h3 className="mb-6 border-b border-white/10 pb-4 text-3xl font-bold text-white">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full rounded-lg bg-orange-500 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 hover:cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
