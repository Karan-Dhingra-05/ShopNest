import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email] = useState(() => localStorage.getItem("verifyEmail"));

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      return alert("Please enter a valid 6-digit OTP.");
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return alert(data.message);
      }
      localStorage.removeItem("verifyEmail");
      login(data);

      alert(data.message);

      navigate("/shop");
    } catch (error) {
      console.error(error);
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Unable to resend OTP.");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form
        onSubmit={handleVerify}
        className="relative flex w-full max-w-[420px] flex-col gap-5 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute left-[-50%] top-0 h-1 w-[200%] animate-shimmer bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <h2 className="text-center text-3xl font-bold text-white">
          Verify Email
        </h2>
        <p className="text-center text-sm text-zinc-400">
          Enter the OTP sent to
          <br />
          <span className="font-semibold text-orange-500">{email}</span>
        </p>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          required
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-4
        text-center text-xl tracking-[0.5rem] text-white outline-none
        transition-all duration-300 placeholder:text-zinc-500
        focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:bg-orange-400"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          onClick={handleResendOTP}
          className="text-orange-500 transition hover:text-orange-400"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
