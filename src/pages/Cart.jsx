import React, { useMemo } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { CartItem, Summery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems, selectTotalPrice } from "../features/cart/cartSlice";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice";

export const Cart = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
 

  const GST = useMemo(() => {
    return totalPrice * 0.18;
  }, [totalPrice]);

  if (cart.items.length === 0) {
    return (
      <div className="w-full min-h-screen text-center pt-10 text-xl">
        <p>You cart is empty</p>
        <button
          onClick={() => navigate("/shop")}
          className="text-sm text-white px-4 mt-2 py-1 bg-red-500 rounded-full cursor-pointer"
        >
          continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-col-3  gap-4">
      <h1 className="text-2xl font-semibold pt-4">Shopping Cart</h1>
      <div className="grid md:grid-cols-[2fr_1fr] gap-2 h-auto">
        <div className="grid grid-cols-1 gap-2 h-fit">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => dispatch(removeFromCart(item.id))}
              onIncrease={() => dispatch(increaseQuantity(item.id))}
              onDecrease={() => dispatch(decreaseQuantity(item.id))}
            />
          ))}
        </div>
        <div >
          <Summery
            navigate={() => navigate("/checkout")}
            totalItems={totalItems}
            totalPrice={totalPrice}
            GST={GST}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
