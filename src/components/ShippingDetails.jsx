import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { useId } from "react";
import { SiMapillary } from "react-icons/si";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const ShippingDetails = ({ register, errors }) => {
  const id = useId();
  return (
    <div className="bg-white p-2 rounded">
      <div className="flex items-center gap-4 py-2">
        <span className="text-red-400 bg-red-200 rounded p-1">
          <GrMapLocation />
        </span>
        <span>Shipping Details</span>
      </div>
      <div className="grid grid-cols-1 pb-4 gap-4">
        <div className="grid grid-cols-2 gap-2">
          <label htmlFor={`name_${id}`} className="relative">
            <p>Full Name</p>
            <input
              type="text"
              id={`name_${id}`}
              {...register("fullName", {
                required: "Full name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                  message: "Enter your full name ",
                },
              })}
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
            {errors.fullName && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.fullName.message}
              </span>
            )}
          </label>
          <label htmlFor={`number_${id}`} className="relative">
            <p>Phone Number</p>
            <input
              type="text"
              id={`number_${id}`}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
            {errors.phoneNumber && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.phoneNumber.message}
              </span>
            )}
          </label>
        </div>

        <div>
          <label htmlFor={`email_${id}`} className="relative">
            <p>Email Address</p>
            <input
              type="email"
              id={`email_${id}`}
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="example@gmail.com"
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
            {errors.email && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label htmlFor={`addressLine1${id}`} className="relative">
            <p>Address Line 1</p>
            <input
              type="text"
              id={`addressLine1${id}`}
              {...register("addressLine1", { required: "Address is required" })}
              placeholder="your address"
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
            {errors.addressLine1 && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.addressLine1.message}
              </span>
            )}
          </label>
          <label htmlFor={`addressLine2${id}`}>
            <p>Address Line 2 (optional)</p>
            <input
              type="text"
              id={`addressLine2${id}`}
              {...register("addressLine2")}
              placeholder="your address"
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          <label htmlFor={`city_${id}`} className="relative">
            <p>City</p>
            <input
              type="text"
              id={`city_${id}`}
              {...register("city", {
                required: "city is required",
                minLength: {
                  value: 2,
                  message: "Enter your city name",
                },
              })}
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
            {errors.city && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.city.message}
              </span>
            )}
          </label>

          <label htmlFor={`state_${id}`} className="relative">
            <p>State</p>
            <select
              id={`state_${id}`}
              {...register("state", { required: "state is required" })}
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            >
              <option value=""> Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.state.message}
              </span>
            )}
          </label>

          <label htmlFor={`pinCode_${id}`} className="relative">
            <p>PIN Code</p>
            <input
              type="text"
              inputMode="numeric"
              id={`pinCode_${id}`}
              {...register("pinCode", {
                required: "PIN code is required",
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: "Enter a valid 6-digit PIN code",
                },
              })}
              className="w-full border-2 border-gray-200 rounded outline-0 px-2 py-1"
            />
             {errors.pinCode && (
              <span className="absolute left-0 -bottom-4 text-xs text-red-600">
                {errors.pinCode.message}
              </span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
