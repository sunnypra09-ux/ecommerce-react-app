
import React from "react";

const Summery = ({ totalPrice, totalItems, navigate, GST }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900">
        Order Summary
      </h3>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{`Subtotal (${totalItems})`}</span>
        <span className="font-medium text-gray-900">
          ₹{Number(totalPrice.toFixed(2))}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span className="font-medium text-green-600">
          Free
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>GST (18%)</span>
        <span className="font-medium text-gray-900">
          ₹{Number(GST.toFixed(2))}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>₹{Number((totalPrice + GST).toFixed(2))}</span>
      </div>

      <button
        onClick={navigate}
        className="mt-1 w-full rounded-lg bg-red-500 py-2.5 font-semibold text-white transition hover:bg-red-600"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Summery;

