import React, { useEffect, useMemo, useState } from "react";
import { updateOrderStatuses, cancelOrder } from "../features/order/orderSlice";

import { useOrder } from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";

import { FaArrowRightLong } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useUser } from "@clerk/react";

const MyOrders = () => {
  const orders = useOrder();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(updateOrderStatuses());

    const timer = setInterval(() => {
      dispatch(updateOrderStatuses());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const myOrders = orders.filter((order) => order.userId === user.id);

  // const

  // Filter orders
  const filteredOrders = useMemo(() => {
    if (filter === "All") {
      return myOrders;
    }

    return myOrders.filter((order) => order.orderStatus === filter);
  }, [myOrders, filter]);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Status badge
  const getIcon = (order) => {
    switch (order) {
      case "Cancelled":
        return <FaCircleXmark />;
      case "Delivered":
        return <FaCircleCheck />;
      case "Shipped":
        return <TbTruckDelivery />;
      default:
        return <FaBoxOpen />;
    }
  };

  const getStyle = (order) => {
    switch (order) {
      case "Cancelled":
        return "bg-red-100 text-red-500";
      case "Delivered":
        return "bg-green-100 text-green-500";
      case "Shipped":
        return "bg-orange-100 text-orange-500";

      default:
        return "bg-yellow-100 text-yellow-500";
    }
  };

  const getDeliverDate = (date) => {
    const createAt = new Date(date).getTime();
    const deliveryDate = createAt + 2 * 1000 * 60 * 60 * 24;
    return new Date(deliveryDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour12: true,
    });
  };

  const newOrder = [...filteredOrders];
  if (newOrder) {
    newOrder.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }
  // Status icon

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Orders</h1>

          <p className="text-gray-600">
            View and track all your orders in one place
          </p>
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded border-2 border-gray-200 bg-white px-4 py-1 outline-0"
        >
          <option value="All">All Orders</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders */}
      <div className="grid grid-cols-1 gap-4 py-5">
        {newOrder.length === 0 ? (
          <div className="rounded border-2 border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          newOrder.map((order) => {
            const isCancelled = order.orderStatus === "Cancelled";

            const isShipped = order.orderStatus === "Shipped";

            const isDelivered = order.orderStatus === "Delivered";

            return (
              <div
                key={order.id}
                className="grid grid-cols-1 gap-4 rounded border-2 border-gray-200 bg-white p-4 md:grid-cols-3"
              >
                {/* ================= LEFT ================= */}
                <div className="flex flex-col gap-4">
                  {/* Order ID */}
                  <div>
                    <p className="text-xs text-gray-600">Order ID</p>

                    <h3 className="font-semibold">{order.id}</h3>
                  </div>

                  {/* Order Date */}
                  <div>
                    <p className="text-xs text-gray-600">Order Date</p>

                    <h3 className="text-sm">{formatDate(order.orderDate)}</h3>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <p className="text-xs text-gray-600">Payment Method</p>

                    <h3 className="text-sm capitalize">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </h3>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <p className="text-xs text-gray-600">Payment Status</p>

                    <h3 className="text-sm font-medium">
                      {order.paymentStatus}
                    </h3>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-xs text-gray-600">Total Amount</p>

                    <h3 className="font-semibold">₹{order.total}</h3>
                  </div>

                  {/* Details */}
                  <button
                    onClick={() => navigate(`/order-details/${order.id}`)}
                    className="flex w-fit cursor-pointer items-center gap-2 font-semibold text-blue-500"
                  >
                    <span>View Details</span>

                    <FaArrowRightLong />
                  </button>
                </div>

                {/* ================= MIDDLE ================= */}
                <div className="grid grid-cols-1 gap-4 border-gray-200 px-4 md:border-x">
                  {order.items.map((orderItem) => (
                    <div
                      key={orderItem.id}
                      className="grid grid-cols-[60px_1fr_60px] items-start gap-3"
                    >
                      {/* Image */}
                      <div className="h-15 overflow-hidden rounded bg-gray-100">
                        <img
                          src={orderItem.images?.[0]}
                          alt={orderItem.title}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* Product */}
                      <div>
                        <span className="font-semibold">
                          {orderItem.title.length > 25
                            ? `${orderItem.title.slice(0, 20)}...`
                            : orderItem.title}
                        </span>

                        <p className="text-sm text-gray-600">
                          Qty: {orderItem.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="font-semibold">
                        ₹{orderItem.price * orderItem.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= RIGHT ================= */}
                <div className="flex flex-col gap-4">
                  {/* status */}
                  <div
                    className={`flex items-center gap-2 w-fit px-4 py-1 rounded font-semibold ${getStyle(order.orderStatus)}`}
                  >
                    {order.orderStatus}
                    {getIcon(order.orderStatus)}
                  </div>

                  {isCancelled && (
                    <>
                      <p className="text-sm text-gray-600">Cancelled On</p>
                      <p className="font-semibold">{order.cancelDate}</p>
                      <button
                        onClick={() => navigate(`/order-details/${order.id}`)}
                        className="px-4 py-1 rounded cursor-pointer w-fit border-2 border-gray-200"
                      >
                        View Details
                      </button>
                    </>
                  )}

                  {!isCancelled && (
                    <>
                      {isDelivered ? (
                        <div>
                          <p className="text-sm text-gray-600">Delivered On</p>
                          <span className="text-semibold">
                            {order.cancelDate}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600">
                            Expected delivery
                          </p>
                          <span className="text-semibold">Soon</span>
                        </div>
                      )}

                      {/* Timeline */}

                      <div className="mt-2">
                        <div className="flex items-center ">
                          {/* orderred */}
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-green-500 text-sm text-white flex items-center justify-center p-2">
                              <FaCircleCheck />
                            </div>
                            <p>Ordered</p>
                          </div>

                          <div
                            className={`h-1 w-20 border-2 ${isShipped || isDelivered ? "border-green-500" : "border-gray-200"}`}
                          ></div>

                          {/* Shipped */}
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div
                              className={`${isShipped || isDelivered ? "bg-green-500" : " border-2 border-gray-200"} w-7 h-7 rounded-full  text-sm text-white flex items-center justify-center p-2`}
                            >
                              {(isShipped || isDelivered) && <FaCircleCheck />}
                            </div>
                            <p
                              className={`${!isDelivered && !isShipped ? "text-gray-500" : ""}`}
                            >
                              Shipped
                            </p>
                          </div>

                          <div
                            className={`h-1 w-20 border-2 ${isDelivered ? "border-green-500" : "border-gray-200"}`}
                          ></div>

                          {/* delivered */}
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div
                              className={`${isDelivered ? "bg-green-500" : " border-2 border-gray-200"} w-7 h-7 rounded-full  text-sm text-white flex items-center justify-center p-2`}
                            >
                              {isDelivered && <FaCircleCheck />}
                            </div>
                            <p
                              className={`${!isDelivered ? "text-gray-500" : ""}`}
                            >
                              Delivered
                            </p>
                          </div>
                        </div>

                        <div className="">
                          <button
                            onClick={() =>
                              navigate(`/order-details/${order.id}`)
                            }
                            className="px-4 w-fit mt-4 py-1 font-semibold cursor-pointer rounded border-2 border-gray-200"
                          >
                            Track Order
                          </button>
                          {order.orderStatus === "Processing" && (
                            <button
                              onClick={() =>
                                dispatch(
                                  cancelOrder({
                                    orderId: order.id,
                                  }),
                                )
                              }
                              className="w-fit rounded border-2 border-red-200 px-4 py-1 ml-2 cursor-pointer font-semibold text-red-500"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
