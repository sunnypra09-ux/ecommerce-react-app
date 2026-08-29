import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const orders = useOrder();

  const order = orders?.find((item) => item.id === orderId);

  if (!order) {
    return (
      <div className="min-h-[400px] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            We couldn't find this order.
          </p>

          <button
            onClick={() => navigate("/my-orders")}
            className="mt-5 rounded-lg bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <button
        onClick={() => navigate("/my-orders")}
        className="mb-5 text-sm font-semibold text-red-500"
      >
        ← Back to My Orders
      </button>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h1 className="text-2xl font-bold">Order Details</h1>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold">{order.id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Order Status</p>
            <p className="font-semibold">{order.orderStatus}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-semibold">
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="font-semibold">{order.paymentStatus}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="font-semibold">{order.totalItems}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold">₹{order.total}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-bold">Ordered Items</h2>

        <div className="mt-4 flex flex-col gap-3">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[70px_1fr_auto] items-center gap-3 rounded-lg bg-gray-50 p-3"
            >
              <div className="h-16 w-16 overflow-hidden rounded-lg bg-white">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h3 className="line-clamp-2 font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;