import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useUser } from "@clerk/react";

import { useWishlist } from "../hooks/useWishlist";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const wishlist = useWishlist();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const myWishlist =
    wishlist?.filter((item) => item.userId === user?.id) ?? [];

  const handleRemove = (item) => {
    dispatch(
      toggleWishlist({
        ...item,
        userId: user.id,
      }),
    );
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  /* Empty State */
  if (myWishlist.length === 0) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
          <IoMdHeartEmpty className="text-5xl text-rose-400" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Your Wishlist is Empty
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          Save products you love here and come back to them anytime.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-5 rounded-lg bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <main className="pb-8">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {myWishlist.length}{" "}
            {myWishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
          <IoMdHeartEmpty className="text-xl text-rose-500" />
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {myWishlist.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image */}
            <div
              onClick={() => handleProductClick(item.id)}
              className="relative h-44 cursor-pointer bg-gray-50"
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
              />

              {/* Remove */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                aria-label="Remove from wishlist"
              >
                <RiDeleteBin6Line />
              </button>

              {/* Discount */}
              {item.discountPercentage && (
                <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                  {Math.round(item.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-3">
              <h2 className="line-clamp-1 text-sm font-semibold text-gray-900">
                {item.title}
              </h2>

              <div className="mt-1 flex items-center gap-1">
                <IoIosStar className="text-sm text-yellow-500" />

                <span className="text-xs text-gray-500">
                  {item.rating?.toFixed(1) ?? "0.0"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => handleProductClick(item.id)}
                  className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                >
                  <FiShoppingCart />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
