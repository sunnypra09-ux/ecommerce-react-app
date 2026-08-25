import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { useCart } from "../hooks/useCart";
import { selectTotalPrice, selectTotalItems } from "../features/cart/cartSlice";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cart = useCart();
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = Number(useSelector(selectTotalPrice).toFixed(2));
  const GST = Number((totalPrice * 0.18).toFixed(2));

  return (
    <div className="rounded bg-white">
      <div className="flex items-center gap-2 border-b border-gray-200 p-2">
        <span className="text-red-400 bg-red-200 p-1 rounded">
          <MdOutlineShoppingBag />
        </span>
        <h3>Order Summary</h3>
      </div>
      <div className="px-2  py-4 rounded flex flex-col gap-2 ">
        {cart.items.map((cartItem) => {
          return (
            <div
              key={cartItem.id}
              className="grid grid-cols-[1fr_3fr_1fr] gap-2"
            >
              <div className="bg-gray-200 rounded">
                <img src={cartItem.images[0]} alt={cartItem.title} />
              </div>
              <div className="">
                <span className="font-semibold  md:text-sm">
                  {cartItem.title.length > 25
                    ? `${cartItem.title.slice(0, 25)}...`
                    : cartItem.title}
                </span>
                <p className="text-gray-600 md:text-sm">{`Qty : ${cartItem.quantity}`}</p>
              </div>
              <div className="font-semibold text-[1rem] ">
                ₹{cartItem.price * cartItem.quantity}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-y border-gray-200 px-2 py-4">
        <div className="flex items-center justify-between text-gray-600">
          <span>{`Subtotal (${totalItems} items)`}</span>
          <span className="font-semibold text-black">₹{totalPrice}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <span>Shipping Charge</span>
          <span className="font-semibold text-green-500">₹0</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <span>GST (18%)</span>
          <span className="font-semibold text-black">₹{GST}</span>
        </div>
      </div>

      <div className="py-4 px-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl">Total Amount</h3>
          <span className="font-bold text-xl">₹{totalPrice + GST}</span>
        </div>
        <button className="flex items-center justify-center gap-3 bg-green-50 text-green-400 rounded py-1 font-semibold">
          <LuShieldCheck className="text-xl" />
          <span>Secure Checkout</span>
        </button>
        <button
          type="submit"
          className=" gap-3 bg-green-500 text-white rounded py-1 font-semibold cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
