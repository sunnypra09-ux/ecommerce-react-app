import React from "react";
import { MdMinimize } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="grid grid-cols-[100px_1fr_150px_100px_50px] gap-5 p-2  border-2 border-gray-200 rounded ">
      <img src={item.images[0]} alt={item.title} className="rounded bg-amber-50" />
      <h3 className="font-semibold line-clamp-1">{item.title}</h3>
      <div className="font-semibold  justify-center flex">
        <button
          onClick={onDecrease}
          className="border-2 border-gray-200 px-2 w-7 h-7 inline-flex items-center justify-center rounded cursor-pointer"
        >
          <MdMinimize />
        </button>
        <button className="border-2 border-gray-200 px-2 w-7 h-7 inline-flex items-center justify-center rounded ">
          {item.quantity}
        </button>
        <button
          onClick={onIncrease}
          className="border-2 border-gray-200 px-2 w-7 h-7 inline-flex items-center justify-center rounded cursor-pointer"
        >
          <GoPlus />
        </button>
      </div>
      <h1 className="text-xl font-semibold">₹{item.price}</h1>
      <span>
        <RiDeleteBin6Line
          onClick={onRemove}
          className="text-xl text-red-600 cursor-pointer"
        />
      </span>
    </div>
  );
};

export default CartItem;
