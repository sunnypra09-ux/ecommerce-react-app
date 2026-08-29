import React, { useMemo } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { CartItem, Summery, EmptyState } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems, selectTotalPrice } from "../features/cart/cartSlice";
import { useUser } from "@clerk/react";

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
  const { user } = useUser();
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  const myCart = cart.items.filter((item) => item.userId === user.id);

  const GST = useMemo(() => {
    return totalPrice * 0.18;
  }, [totalPrice]);

  if (myCart.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet."
        buttonText="Continue Shopping"
        onClick={() => navigate("/shop")}
      />
    );
  }

  return (
    <div className="grid grid-col-3  gap-4">
      <h1 className="text-2xl font-semibold pt-4">Shopping Cart</h1>
      <div className="grid md:grid-cols-[2fr_1fr] gap-2 h-auto">
        <div className="grid grid-cols-1 gap-2 h-fit">
          {myCart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => dispatch(removeFromCart(item.id))}
              onIncrease={() => dispatch(increaseQuantity(item.id))}
              onDecrease={() => dispatch(decreaseQuantity(item.id))}
            />
          ))}
        </div>
        <div>
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
