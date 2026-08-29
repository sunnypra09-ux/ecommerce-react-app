
import React from "react";

import { MdMinimize } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="grid grid-cols-[80px_1fr_130px_90px_40px] items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-sm">
      {/* Product Image */}
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={item.images[0]}
          alt={item.title}
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* Product Name */}
      <h3 className="line-clamp-2 font-semibold text-gray-900">
        {item.title}
      </h3>

      {/* Quantity */}
      <div className="flex items-center justify-center">
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
          <button
            onClick={onDecrease}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100"
          >
            <MdMinimize />
          </button>

          <button className="flex h-8 w-9 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-900">
            {item.quantity}
          </button>

          <button
            onClick={onIncrease}
            className="flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100"
          >
            <GoPlus />
          </button>
        </div>
      </div>

      {/* Price */}
      <h1 className="text-lg font-bold text-gray-900">
        ₹{item.price}
      </h1>

      {/* Delete */}
      <button
        onClick={onRemove}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
      >
        <RiDeleteBin6Line className="text-xl" />
      </button>
    </div>
  );
};

export default CartItem;

