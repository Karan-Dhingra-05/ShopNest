import React from "react";

const ReturnPolicy = () => {
  return (
    <section className="min-h-screen bg-[#0b0b0d] py-24 px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-700/60 bg-zinc-900 p-10 md:p-14 shadow-xl">
        <h2 className="mb-5 border-b border-white/10 pb-4 text-3xl font-bold text-white">
          Return & Refund Policy
        </h2>

        <p className="mb-5">
          At ShopNest, we proudly stand behind the quality of our merchandise.
          If for any reason you are completely dissatisfied with your purchase,
          you may securely initiate a return within 30 days of receiving your
          order.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          1. Eligibility for Returns
        </h4>

        <p className="mb-4">
          To be eligible for a return, the item must be completely unused,
          housed in the same condition that it was received, and maintained
          within its original factory packaging. Receipts or proof of purchase
          are required.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          2. Refund Processing
        </h4>

        <p className="mb-4">
          Once your return is received and inspected, an email notification will
          be sent regarding the approval status. Approved refunds will be
          processed through your original Razorpay payment method within 5–7
          business days.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          3. Exempted Products
        </h4>

        <p className="mb-4">
          Certain categories such as perishable items, custom software, digital
          media, or physically damaged items are not eligible for returns or
          refunds.
        </p>

        <h4 className="mt-6 mb-3 text-xl font-semibold text-orange-500">
          4. Shipping Costs
        </h4>

        <p>
          Customers are responsible for return shipping charges unless the
          return is due to a defective or incorrect product. Restocking fees may
          apply in certain situations.
        </p>
      </div>
    </section>
  );
};

export default ReturnPolicy;
