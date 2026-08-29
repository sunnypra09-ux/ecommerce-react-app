import React from "react";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDateRange, MdPayment } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { GrLocation, GrCart } from "react-icons/gr";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuShieldCheck, LuShieldX } from "react-icons/lu";
import { IoIosListBox } from "react-icons/io";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orders = useOrder();
  const { orderId } = useParams();

  const latestOrder = orders?.find((order) => order.id === orderId);

  // Safe empty state
  if (!latestOrder) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <FaClipboardList className="text-3xl text-gray-400" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Order Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          We couldn't find the order you're looking for.
        </p>

        <button
          onClick={() => navigate("/my-orders")}
          className="mt-5 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          View My Orders
        </button>
      </div>
    );
  }

  const formattedDate = new Date(latestOrder.orderDate).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
  );

  const isPaymentPending =
    latestOrder.paymentStatus === "Pending" ||
    latestOrder.paymentStatus === "Not Paid";

  return (
    <main className="pb-8">
      {/* Success Header */}
      <header className="flex flex-col items-center gap-3 py-6 text-center">
        <FaCheckCircle className="text-7xl text-green-500" />

        <h1 className="text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="max-w-md text-sm leading-6 text-gray-500">
          Thank you for shopping with us.
          <br />
          Your order has been placed and will be delivered soon.
        </p>

        {/* Order ID */}
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-lg text-green-500">
            <FaClipboardList />
          </span>

          <div className="text-left">
            <p className="text-xs text-gray-500">Order ID</p>

            <span className="text-sm font-bold text-green-500">
              {latestOrder.id}
            </span>
          </div>
        </div>
      </header>

      {/* Main Card */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {/* Section Header */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
          <FaRegUser className="text-gray-600" />

          <h2 className="font-semibold text-gray-900">Order Details</h2>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-2 md:grid-cols-4">
          <InfoCard
            icon={<MdOutlineDateRange />}
            label="Order Date"
            value={formattedDate}
          />

          <InfoCard
            icon={<MdPayment />}
            label="Payment Method"
            value={latestOrder.paymentMethod}
          />

          <InfoCard
            icon={isPaymentPending ? <LuShieldX /> : <LuShieldCheck />}
            label="Payment Status"
            value={latestOrder.paymentStatus}
            valueClass={isPaymentPending ? "text-orange-500" : "text-green-500"}
            iconClass={
              isPaymentPending
                ? "bg-orange-50 text-orange-500"
                : "bg-green-50 text-green-500"
            }
          />

          <InfoCard
            icon={<FiBox />}
            label="Order Status"
            value={latestOrder.orderStatus}
          />
        </div>

        {/* Address + Summary */}
        <div className="grid grid-cols-1 gap-6 border-y border-gray-200 py-5 md:grid-cols-2">
          {/* Shipping Address */}
          <div>
            <SectionTitle icon={<GrLocation />} title="Shipping Address" />

            <div className="space-y-1 px-1 pt-3 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">
                {latestOrder.fullName}
              </p>

              <p>{latestOrder.phoneNumber}</p>

              <p>{latestOrder.email}</p>

              <p className="pt-2">{latestOrder.addressLine1}</p>

              <p>
                {latestOrder.city}, {latestOrder.state} - {latestOrder.pinCode}
              </p>

              <p>India</p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <SectionTitle
              icon={<MdOutlineShoppingBag />}
              title="Order Summary"
            />

            <div className="mt-3 space-y-3 rounded-lg bg-gray-50 p-4">
              <SummaryRow
                label={`Subtotal (${latestOrder.totalItems} items)`}
                value={`₹${latestOrder.subtotal}`}
              />

              <SummaryRow
                label="Shipping Charge"
                value="₹0"
                valueClass="text-green-500"
              />

              <SummaryRow label="GST (18%)" value={`₹${latestOrder.gst}`} />

              <div className="border-t border-gray-200 pt-3">
                <SummaryRow
                  label="Total Amount"
                  value={`₹${latestOrder.total}`}
                  bold
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="pt-5">
          <SectionTitle
            icon={<MdOutlineShoppingBag />}
            title={`Ordered Items (${latestOrder.totalItems})`}
          />

          <div className="mt-4 space-y-3">
            {latestOrder.items?.map((cartItem) => (
              <div
                key={cartItem.id}
                className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2 sm:grid-cols-[80px_1fr_auto]"
              >
                {/* Image */}
                <div className="h-16 w-16 overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20">
                  <img
                    src={cartItem.images?.[0]}
                    alt={cartItem.title}
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                {/* Product */}
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
                    {cartItem.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Qty: {cartItem.quantity}
                  </p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{cartItem.price * cartItem.quantity}
                  </p>

                  <p className="text-xs text-gray-500">
                    ₹{cartItem.price} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Actions */}
      <footer className="flex flex-col items-center gap-4 py-6 text-center">
        <p className="text-sm text-gray-500">
          We have sent the order details to your email.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 rounded-lg border border-green-500 px-5 py-2.5 text-sm font-semibold text-green-500 transition hover:bg-green-50"
          >
            <IoCartOutline />
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            <IoIosListBox />
            View My Orders
          </button>
        </div>
      </footer>
    </main>
  );
};

/* ----------------------------------
   Info Card
---------------------------------- */

const InfoCard = ({
  icon,
  label,
  value,
  iconClass = "bg-green-50 text-green-500",
  valueClass = "text-gray-900",
}) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${iconClass}`}
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className={`truncate text-sm font-semibold ${valueClass}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

/* ----------------------------------
   Section Title
---------------------------------- */

const SectionTitle = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600">{icon}</span>

      <h2 className="font-semibold text-gray-900">{title}</h2>
    </div>
  );
};

/* ----------------------------------
   Summary Row
---------------------------------- */

const SummaryRow = ({
  label,
  value,
  valueClass = "text-gray-900",
  bold = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={bold ? "font-bold text-gray-900" : "text-sm text-gray-600"}
      >
        {label}
      </span>

      <span
        className={`${
          bold ? "text-xl font-bold" : "text-sm font-semibold"
        } ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
};

export default OrderSuccess;
