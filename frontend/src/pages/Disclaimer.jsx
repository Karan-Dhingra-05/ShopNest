import React from "react";

const Disclaimer = () => {
  return (
    <section className="min-h-screen bg-[#0b0b0d] py-20 px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-700/60 bg-zinc-900 p-10 md:p-14 shadow-xl">
        <h2 className="mb-5 border-b border-white/10 pb-4 text-3xl font-bold text-white">
          Legal & Site Disclaimer
        </h2>

        <p className="mb-5">
          The data, interfaces, and graphical components represented across the
          ShopNest domain strictly act uniquely as an educational development
          platform. This codebase models rigorous application structures and
          architectures for purely demonstrative, portfolio-oriented engineering
          usage.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          1. Accuracy of Materials
        </h4>

        <p className="mb-4">
          The materials spanning the ShopNest interface may heavily include
          dynamic technical, typographical, or dummy photographic elements.
          Product matrices mapped in the DB pipeline do absolutely not correlate
          to strictly real physical outputs and are safely populated via generic
          Unsplash imagery protocols.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          2. Payment Processing Restrictions
        </h4>

        <p className="mb-4">
          No authentic financial variables are handled natively within this
          environment. All payment endpoints forcefully bind exclusively to
          external testing-based networks (Sandbox Razorpay environments). No
          exact deductibles exist.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          3. External Binding Links
        </h4>

        <p className="mb-4">
          ShopNest operates completely independent domains and takes strictly
          zero absolute parameter responsibility over the specific contents or
          behaviors populated via external routing anchors generated implicitly
          by third-party configurations.
        </p>

        <p className="mt-8 text-sm italic">
          By interacting natively within this codebase, you unconditionally
          signal acceptance bounded by these parameters efficiently.
        </p>
      </div>
    </section>
  );
};

export default Disclaimer;
