import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/react";

import { useOrder } from "../hooks/useOrder";
import { cancelOrder } from "../features/order/orderSlice";

import { FaArrowLeft } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleXmark } from "react-icons/fa6";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useOrder();
  const { user } = useUser();

  // Find current user's order
  const order = orders?.find(
    (item) => item.id === orderId && item.userId === user?.id,
  );

  // Order not found
  if (!order) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <FaBoxOpen className="text-2xl text-gray-400" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-gray-900">
          Order not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          We couldn't find this order.
        </p>

        <button
          onClick={() => navigate("/my-orders")}
          className="mt-5 rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  const isCancelled = order.orderStatus === "Cancelled";
  const isShipped =
    order.orderStatus === "Shipped" ||
    order.orderStatus === "Delivered";
  const isDelivered = order.orderStatus === "Delivered";

  const handleCancel = () => {
    dispatch(
      cancelOrder({
        orderId: order.id,
      }),
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className="pb-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/my-orders")}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          <FaArrowLeft className="text-sm" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="text-sm text-gray-500">
            Order ID: {order.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-5 lg:col-span-2">
          {/* Order Status */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Order Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {order.orderStatus === "Processing" && (
                    <FaBoxOpen className="text-yellow-500" />
                  )}

                  {order.orderStatus === "Shipped" && (
                    <TbTruckDelivery className="text-orange-500" />
                  )}

                  {order.orderStatus === "Delivered" && (
                    <FaCircleCheck className="text-green-500" />
                  )}

                  {order.orderStatus === "Cancelled" && (
                    <FaCircleXmark className="text-red-500" />
                  )}

                  <h2 className="text-lg font-bold text-gray-900">
                    {order.orderStatus}
                  </h2>
                </div>
              </div>

              <div
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isCancelled
                    ? "bg-red-50 text-red-500"
                    : isDelivered
                      ? "bg-green-50 text-green-600"
                      : isShipped
                        ? "bg-orange-50 text-orange-500"
                        : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {order.orderStatus}
              </div>
            </div>

            {/* Timeline */}
            {!isCancelled && (
              <div className="mt-8">
                <div className="flex items-start">
                  {/* Ordered */}
                  <TimelineStep
                    label="Ordered"
                    active
                  />

                  <TimelineLine active={isShipped} />

                  {/* Shipped */}
                  <TimelineStep
                    label="Shipped"
                    active={isShipped}
                  />

                  <TimelineLine active={isDelivered} />

                  {/* Delivered */}
                  <TimelineStep
                    label="Delivered"
                    active={isDelivered}
                  />
                </div>
              </div>
            )}

            {isCancelled && (
              <div className="mt-5 rounded-lg bg-red-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-red-400">
                  Cancelled On
                </p>

                <p className="mt-1 text-sm font-semibold text-red-600">
                  {order.cancelDate || "N/A"}
                </p>
              </div>
            )}
          </section>

          {/* Items */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Ordered Items
            </h2>

            <div className="space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[70px_1fr_auto] items-center gap-4 rounded-lg bg-gray-50 p-3"
                >
                  <div className="h-[70px] w-[70px] overflow-hidden rounded-lg bg-white">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>

                    <p className="text-xs text-gray-500">
                      ₹{item.price} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <Info label="Name" value={order.shipping?.name} />
              <Info label="Phone" value={order.shipping?.phone} />
              <Info label="Address" value={order.shipping?.address} />
              <Info label="City" value={order.shipping?.city} />
              <Info label="State" value={order.shipping?.state} />
              <Info label="Pincode" value={order.shipping?.pincode} />
            </div>
          </section>
        </div>

        {/* Right Section */}
        <aside className="h-fit space-y-5">
          {/* Order Summary */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <SummaryRow
                label={`Subtotal (${order.totalItems})`}
                value={`₹${Number(order.subtotal).toFixed(2)}`}
              />

              <SummaryRow
                label="Shipping"
                value="Free"
              />

              <SummaryRow
                label="GST"
                value={`₹${Number(
                  order.total - order.subtotal,
                ).toFixed(2)}`}
              />

              <div className="border-t border-gray-200 pt-3">
                <SummaryRow
                  label="Total"
                  value={`₹${Number(order.total).toFixed(2)}`}
                  bold
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Payment
            </h2>

            <div className="space-y-3">
              <SummaryRow
                label="Method"
                value={
                  order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : order.paymentMethod
                }
              />

              <SummaryRow
                label="Status"
                value={order.paymentStatus}
              />
            </div>
          </section>

          {/* Order Date */}
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <Info
              label="Order Placed"
              value={formatDate(order.orderDate)}
            />
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {!isCancelled &&
              order.orderStatus === "Processing" && (
                <button
                  onClick={handleCancel}
                  className="w-full cursor-pointer rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-100"
                >
                  Cancel Order
                </button>
              )}

            <button
              onClick={() => navigate("/my-orders")}
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to My Orders
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

/* ----------------------------------
   Timeline
---------------------------------- */

const TimelineStep = ({ label, active }) => {
  return (
    <div className="flex min-w-fit flex-col items-center">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          active
            ? "bg-green-500 text-white"
            : "border-2 border-gray-200 bg-white text-gray-300"
        }`}
      >
        {active && <FaCircleCheck />}
      </div>

      <span
        className={`mt-2 text-xs font-medium ${
          active ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const TimelineLine = ({ active }) => {
  return (
    <div
      className={`mt-4 h-0.5 flex-1 ${
        active ? "bg-green-500" : "bg-gray-200"
      }`}
    />
  );
};

/* ----------------------------------
   Info
---------------------------------- */

const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-700">
        {value || "N/A"}
      </p>
    </div>
  );
};

/* ----------------------------------
   Summary Row
---------------------------------- */

const SummaryRow = ({ label, value, bold = false }) => {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-base font-bold" : "font-medium"
      }`}
    >
      <span className="text-gray-600">{label}</span>

      <span className="text-gray-900">{value}</span>
    </div>
  );
};

export default OrderDetails;

