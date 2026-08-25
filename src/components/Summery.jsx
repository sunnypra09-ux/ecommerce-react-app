import React from "react";

const Summery = ({ totalPrice, totalItems, navigate, GST }) => {
  return (
    <div className="flex flex-col gap-4 border-2 border-gray-200 rounded p-3">
      <h3 className="font-bold text-2xl">Oreder Summery</h3>
      <div className="flex items-center justify-between font-semibold">
        <span>{`Subtotal (${totalItems})`}</span>
        <span>₹{Number(totalPrice.toFixed(2))}</span>
      </div>

      <div className="flex items-center justify-between font-semibold">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="flex items-center justify-between font-semibold">
        <span>GST (18%)</span>
        <span>₹{Number(GST.toFixed(2))}</span>
      </div>

      <div className="flex  items-center justify-between text-xl font-bold">
        <span>Total</span>
        <span>₹{Number((totalPrice + GST).toFixed(2))}</span>
      </div>
      <button
        onClick={navigate}
        className="text-white bg-red-500 rounded text-center font-semibold py-1 cursor-pointer"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Summery;
