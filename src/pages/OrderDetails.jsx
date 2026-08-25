import React, { use } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { FaRegCheckCircle } from "react-icons/fa";
import { TbXboxX } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaBoxOpen } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../features/order/orderSlice";
import { useUser } from "@clerk/react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useOrder();
  const order = orders?.find(
    (order) => order.id === orderId && order.userId === user.id,
  );

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Order not found</h2>

        <button
          onClick={() => navigate("/my-orders")}
          className="mt-4 rounded border px-4 py-2"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  const isProcessing = order.orderStatus === "Processing";
  const isCancelled = order.orderStatus === "Cancelled";
  const isDelivered = order.orderStatus === "Delivered";
  const isShipped = order.orderStatus === "Shipped";

  console.log(orders);

  const formateDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour12: true,
      minute: "2-digit",
      hour: "2-digit",
    });
  };

  const getStyle = (status) => {
    switch (status) {
      case "Cancelled":
        return "text-red-500";
      case "Delivered":
        return "text-green-500";
      case "Shipped":
        return "text-orange-500";
      default:
        return "text-yellow-500";
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "Cancelled":
        return <TbXboxX />;
      case "Delivered":
        return <FaRegCheckCircle />;
      case "Shipped":
        return <LiaShippingFastSolid />;
      default:
        return <FaBoxOpen />;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-[2fr_1fr] gap-4 my-4">
        <div className="p-2 bg-white rounded">
          <span
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-blue-500"
          >
            <MdOutlineKeyboardBackspace />
            Back to My Orders
          </span>

          <h1 className="text-xl font-semibold mt-2">Orer Details</h1>
          <p className="font-semibold">Order ID : {orderId}</p>
          <p className="text-xs text-gray-600">
            Placed on {formateDate(order.orderDate)}
          </p>
        </div>

        <div className="bg-white rounded border-2 border-gray-200 p-2">
          <span className="text-sm text-gray-600">Order Status</span>
          <h1
            className={`font-semibold text-xl flex items-center gap-2 w-fit ${getStyle(order.orderStatus)}`}
          >
            {order.orderStatus}
            {getIcon(order.orderStatus)}
          </h1>

          {isCancelled && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Cancelled On</p>
              <span className="font-semibold">{order.cancelDate}</span>
            </div>
          )}

          {/* {timeline} */}
          {!isCancelled && (
            <div className="flex items-center justify-center rounded mt-4">
              <div className="flex flex-col items-center justify-center gap-1">
                <FaCircleCheck className="text-2xl text-green-500" />
                <p className="text-sm font-semibold">Processing</p>
              </div>
              <div
                className={`h-1 w-15 ${isShipped || isDelivered ? "bg-green-500" : "bg-gray-200"}`}
              ></div>

              <div className="flex flex-col items-center justify-center gap-1">
                {isShipped || isDelivered ? (
                  <FaCircleCheck className="text-2xl text-green-500" />
                ) : (
                  <FaCircleXmark className="text-2xl text-red-500" />
                )}
                <p
                  className={`text-sm font-semibold ${isShipped ? "" : "text-gray-600"}`}
                >
                  Shipped
                </p>
              </div>
              <div
                className={`h-1 w-15 ${isDelivered ? "bg-green-500" : "bg-gray-200"}`}
              ></div>

              <div className="flex flex-col items-center justify-center gap-1">
                {isDelivered ? (
                  <FaCircleCheck className="text-2xl text-green-500" />
                ) : (
                  <FaCircleXmark className="text-2xl text-red-500" />
                )}
                <p
                  className={`text-sm font-semibold ${isDelivered ? "" : "text-gray-600"}`}
                >
                  Delivered
                </p>
              </div>
            </div>
          )}

          {isProcessing && (
            <button
              onClick={() => dispatch(cancelOrder({ orderId: order.id }))}
              className="border-2 border-red-400 text-red-500 mt-5 px-4 py-1 rounded cursor-pointer font-semibold "
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
        <div className="bg-white rounded border-2 border-gray-200 p-2">
          <span className="text-sm font-semibold">
            Items ({order.items.length})
          </span>

          <div className="grid grid-cols-1 gap-4 border-gray-200 px-4 my-4">
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

            {order.items.length > 3 && <span>View All Items </span>}
          </div>
        </div>

        <div className="grid grid-col-1 gap-2">
          <div className="rounded border-2 bg-white border-gray-200 p-2">
            <span className="font-semibold flex items-center gap-2">
              <MdLocationPin /> Shipping Address
            </span>
            <div className="text-gray-600 flex flex-col gap-1">
              <p className="text-semibold text-black mt-2">{order.fullName}</p>
              <p>{order.addressLine1}</p>
              <p>{order.pinCode} , India</p>
              <p>+91 {order.phoneNumber}</p>
            </div>
          </div>
          <div className="rounded border-2 bg-white border-gray-200 p-2">
            <span className="font-semibold flex items-center gap-2">
              <MdPayment /> Shipping Address
            </span>

            <div className="mt-2">
              <div className="flex items-center justify-between">
                <span>Payment Status</span>
                <span
                  className={`${order.paymentStatus === ("Pending" || "Not Paid") ? "text-orange-400" : "text-green-500"}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Method</span>
                <span className="uppercase">{order.paymentMethod}</span>
              </div>

              {order.orderStatus !== "Cancelled" &&
                order.paymentMethod !== "COD" && (
                  <div className="flex items-center justify-between">
                    <span>Paid on</span>
                    <span>{formateDate(order.orderDate)}</span>
                  </div>
                )}

              {order.orderStatus === "Cancelled" &&
                order.paymentMethod !== "COD" && (
                  <div className="flex items-center justify-between">
                    <span>Refund on</span>
                    <span>{formateDate(order.cancelDate)}</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
        <div className="rounded border-2 border-gray-200 p-2 bg-white">
          <span className="font-semibold text-xl">Order Summery</span>

          <div className="text-gray-600 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span>{`Subtotal (${order.items.length} Items)`}</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping Charge</span>
              <span className="font-semibold text-green-500">Free</span>
            </div>

            <div className="flex items-center justify-between">
              <span>GST (18%)</span>
              <span>₹{order.gst}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
        <div className="rounded border-2 border-gray-200 p-2 bg-white">
          <span className="font-semibold text-xl">Need Help ?</span>
          <p className="text-gray-600 text-sm ">
            You can return or replace your items with in 7 days of delivery
          </p>

          <button className="px-4 py-1 rounded cursor-pointer mt-5 border-2 border-blue-400 text-sm font-semibold text-blue-500">
            Request Retuen / Replace
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
