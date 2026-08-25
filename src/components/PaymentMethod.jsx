import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";

import { SiGooglepay } from "react-icons/si";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const PaymentMethod = ({ register, errors }) => {
  const paymentMethods = [
    {
      id: "upi",
      label: "UPI / Google Pay / PhonePe",
      icon: SiGooglepay,
    },
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: FaCreditCard,
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      icon: FaMoneyBillWave,
    },
  ];

  return (
    <div className="bg-white rounded p-2">
      <div className="flex items-center gap-4">
        <span className="text-red-400 bg-red-200 rounded p-1">
          <RiSecurePaymentFill />
        </span>
        <h3>Payment Meathod</h3>
      </div>

      <div className="border-2 border-gray-200 rounded my-4 p-2 flex flex-col gap-2 relative">
        {paymentMethods.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center justify-between ">
              <label
                htmlFor={item.id}
                className="cursor-pointer flex items-center gap-2 flex-1 "
              >
                <input
                  type="radio"
                  name="payment"
                  id={item.id}
                  {...register("paymentMethod", {
                    required: "Please select a payment method",
                  })}
                  value={item.id}
                  className="mr-2"
                />
                <span>{item.label}</span>
              </label>
              <span>
                <Icon className="text-xl text-gray-600" />
              </span>

              {errors.paymentMethod && (
                <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
