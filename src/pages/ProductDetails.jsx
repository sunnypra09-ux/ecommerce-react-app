import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/react";

import { getProductById } from "../api/productAPI";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { useWishlist } from "../hooks/useWishlist";

import { LoadingSpinner, ErrorState } from "../components";

import { IoIosStar } from "react-icons/io";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignedIn, user } = useUser();
  const wishlist = useWishlist();

  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Product not found
        </h1>

        <button
          onClick={() => navigate("/shop")}
          className="mt-4 rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isWishlist = wishlist?.some(
    (item) => item.id === product.id && item.userId === user?.id,
  );

  const discountPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  const handleAddToCart = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        userId: user.id,
      }),
    );
  };

  const handleWishlist = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    dispatch(
      toggleWishlist({
        ...product,
        userId: user.id,
      }),
    );
  };

  return (
    <main className="pb-8">
      {/* Back */}
      <button
        onClick={() => navigate("/shop")}
        className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-red-500"
      >
        <FiArrowLeft />
        Back to Shop
      </button>

      {/* Product */}
      <section className="grid grid-cols-1 gap-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2">
        {/* Image */}
        <div className="flex min-h-[400px] items-center justify-center rounded-xl bg-gray-50 p-6">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-[350px] w-full object-contain transition duration-300 hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-500">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900">
            {product.title}
          </h1>

          {/* Brand */}
          {product.brand && (
            <p className="mt-2 text-sm text-gray-500">
              Brand:{" "}
              <span className="font-semibold text-gray-700">
                {product.brand}
              </span>
            </p>
          )}

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-sm font-semibold text-white">
              <IoIosStar />
              {product.rating?.toFixed(1)}
            </div>

            <span className="text-sm text-gray-500">
              {product.reviews?.length ?? 0} reviews
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 border-y border-gray-200 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{discountPrice.toFixed(2)}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ₹{product.price}
              </span>

              <span className="text-sm font-bold text-green-600">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-6 text-gray-600">
            {product.description}
          </p>

          {/* Stock */}
          <div className="mt-5">
            <span
              className={
                product.stock > 0
                  ? "text-sm font-semibold text-green-600"
                  : "text-sm font-semibold text-red-500"
              }
            >
              {product.stock > 0
                ? `${product.stock} items available`
                : "Out of stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <FiShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 text-xl transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              aria-label="Wishlist"
            >
              {isWishlist ? (
                <IoMdHeart className="text-red-500" />
              ) : (
                <IoMdHeartEmpty />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="border-b border-gray-200 pb-4 text-xl font-bold text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-4 space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.reviewerName}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-yellow-500">
                      <IoIosStar />
                      <span className="text-sm text-gray-600">
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
