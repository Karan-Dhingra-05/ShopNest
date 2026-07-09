import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm(
          "Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?"
        );

        if (fallback) {
          return bypassPayment();
        }

        return alert("Payment failed to initialize");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ShopNest",
        description: "Test Transaction",
        order_id: orderData.id,

        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            const saveOrderRes = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id,
              }),
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate("/ordersuccess");
            } else {
              alert("Order saving failed");
            }
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: "9999999999",
        },

        theme: {
          color: "#f97316",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: "bypass_txn_" + Date.now(),
      }),
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate("/ordersuccess");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    handlePayment();
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <h2 className="mb-8 text-4xl font-bold text-white">Checkout</h2>

      <div className="mx-auto max-w-2xl rounded-xl border border-white/5 bg-zinc-900 p-10 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h3 className="mb-2 text-2xl font-semibold text-white">
            Shipping Address
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value,
              })
            }
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value,
              })
            }
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({
                ...address,
                postalCode: e.target.value,
              })
            }
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({
                ...address,
                country: e.target.value,
              })
            }
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <div className="mt-6 border-t border-white/10 pt-6 text-right">
            <h4 className="mb-6 text-3xl font-bold text-orange-500">
              Total to Pay: ₹{totalPrice.toFixed(2)}
            </h4>

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 hover:cursor-pointer"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
