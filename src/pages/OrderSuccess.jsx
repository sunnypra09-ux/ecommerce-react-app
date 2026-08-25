import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { LuShieldX } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";

import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";

const OrderSucess = () => {
  const navigate = useNavigate();
  const orders = useOrder();
  const { orderId } = useParams();
  console.log(orders);

  const latestOrder = orders?.find((order) => order.id === orderId);
  console.log(latestOrder);
  const formattedDate = new Date(latestOrder?.orderDate).toLocaleString("en-IN");

  return (
    <div>
      <header>
        <div className="flex flex-col items-center gap-3">
          <FaCheckCircle className="text-green-500 text-7xl " />
          <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
          <p className="text-center">
            Thank you for shopping with us. <br /> Your order has been placed
            and will be delivered soon.
          </p>
          <div className="bg-white rounded py-2  px-5 shadow-xl flex items-center gap-2">
            <span className="bg-green-100 text-green-500 rounded-full p-2 text-xl">
              <FaClipboardList />
            </span>
            <div>
              <p className="text-sm text-gray-600"> Order ID</p>
              <span className="text-green-500 font-semibold">
                {latestOrder.id}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="rounded inset-shadow-sm bg-white p-2 my-4">
        <div className="flex items-center gap-2 border-b border-gray-200 py-2">
          <FaRegUser />
          <span className="font-semibold">Order details</span>
        </div>

        <div className="grid  sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div className="bg-white rounded p-2 shadow flex items-center gap-2">
            <span className="bg-green-100 text-green-500 rounded-full p-2 text-xl">
              <MdOutlineDateRange />
            </span>
            <div>
              <p>Order Date</p>
              <span className="font-semibold">{formattedDate}</span>
            </div>
          </div>

          <div className="bg-white rounded p-2 shadow flex items-center gap-2">
            <span className="bg-green-100 text-green-500 rounded-full p-2 text-xl">
              <MdPayment />
            </span>
            <div>
              <p>Payment Meathod</p>
              <span className="font-semibold">{latestOrder.paymentMethod}</span>
            </div>
          </div>

          <div className="bg-white rounded p-2 shadow flex items-center gap-2">
            <span
              className={`${latestOrder.paymentStatus === "Pending" ? "bg-orange-100 text-orange-500" : "bg-green-100 text-green-500"} rounded-full p-2`}
            >
              {latestOrder.paymentStatus === "Pending" ? (
                <LuShieldX />
              ) : (
                <LuShieldCheck />
              )}
            </span>

            <div>
              <p>Payment Status</p>
              <span
                className={`${latestOrder.paymentStatus === "Pending" ? "text-orange-500" : "text-green-500"} font-semibold`}
              >
                {latestOrder.paymentStatus}
              </span>
            </div>
          </div>

          <div className="bg-white rounded p-2 shadow flex items-center gap-2">
            <span className="bg-green-100 text-green-500 rounded-full p-2 text-xl">
              <FiBox />
            </span>
            <div>
              <p>Order Status</p>
              <span className="font-semibold">{latestOrder.orderStatus}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  border-y border-gray-200 my-4 py-2">
          <div>
            <div className="flex items-center gap-2 py-2">
              <span>
                <GrLocation />
              </span>
              <span className="font-semibold ">Shipping Address</span>
            </div>
            <div className="px-6">
              <div>
                <p className="font-semibold">{latestOrder.fullName}</p>
                <p>{latestOrder.phoneNumber}</p>
                <p>{latestOrder.email}</p>
                <p className="mt-2">{latestOrder.addressLine1}</p>
                <p>{`${latestOrder.city},${latestOrder.state} - ${latestOrder.pinCode}`}</p>
                <p>India</p>
              </div>
            </div>
          </div>

          <div className="rounded bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 py-2">
              <span>
                <MdOutlineShoppingBag />
              </span>
              <span className="font-semibold ">Order Summary</span>
            </div>

            <div className="border-y border-gray-200 px-2 py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between ">
                <span>{`Subtotal (${latestOrder.totalItems} items)`}</span>
                <span className="font-semibold text-black">
                  ₹{latestOrder.subtotal}
                </span>
              </div>
              <div className="flex items-center justify-between ">
                <span>Shipping Charge</span>
                <span className="font-semibold text-green-500">₹0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>GST (18%)</span>
                <span className="font-semibold text-black">
                  ₹{latestOrder.gst}
                </span>
              </div>
            </div>

            <div className="py-4 px-2 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl">Total Amount</h3>
                <span className="font-bold text-xl">₹{latestOrder.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span>
              <MdOutlineShoppingBag />
            </span>
            <span className="font-semibold">{`Ordered Items(${latestOrder.totalItems})`}</span>
          </div>
          <div className="flex flex-col gap-2 my-4">
            {latestOrder.items.map((cartItem) => {
              return (
                <div
                  key={cartItem.id}
                  className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[120px_1fr_120px]  gap-2"
                >
                  <div className="bg-gray-200 rounded">
                    <img src={cartItem.images[0]} alt={cartItem.title} />
                  </div>
                  <div className="">
                    <span className="font-semibold  md:text-xl">
                      {cartItem.title.length > 30
                        ? `${cartItem.title.slice(0, 28)}...`
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
        </div>
      </main>

      <div className="flex flex-col gap-4 items-center py-4">
        <p>We have send the order details to your email</p>
        <div className="flex items-center flex-wrap gap-5">
          <button
            onClick={() => navigate("/shop")}
            className="rounded px-4 py-1 font-semibold flex items-center justify-center gap-2 cursor-pointer text-green-500 box-border border-2 border-green-500 "
          >
            <IoCartOutline /> <span>Continue Shopping</span>
          </button>
          <button
            onClick={() => navigate("/my-orders")}
            className="rounded px-4 py-1 font-semibold flex items-center justify-center gap-2 cursor-pointer text-white bg-green-500"
          >
            <IoIosListBox />
            <span>View My Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSucess;
