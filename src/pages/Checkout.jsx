import React from "react";
import { ShippingDetails, PaymentMethod, OrderSummary } from "../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../features/order/orderSlice";

import {
  selectTotalPrice,
  selectTotalItems,
  clearCart,
} from "../features/cart/cartSlice";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cart = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = Number(useSelector(selectTotalPrice).toFixed(2));
  const GST = Number((totalPrice * 0.18).toFixed(2));

  const onSubmit = (data) => {
    const order = {
      id: `ORD-${Date.now()}`,
      ...data,
      items: cart.items,
      subtotal: totalPrice,
      totalItems: totalItems,
      gst: GST,
      total: totalPrice + GST,
      orderDate: new Date().toISOString(),
      paymentStatus: data.paymentMethod === "cod" ? "Pending" : "Paid",
      orderStatus: "Processing",
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="py-5">
      <h1 className="text-2xl font-semibold py-4">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-[2fr_1fr] md:gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <ShippingDetails register={register} errors={errors} />
            </div>
            <div>
              <PaymentMethod register={register} errors={errors} />
            </div>
          </div>
          <div>
            <OrderSummary handleSubmit={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
