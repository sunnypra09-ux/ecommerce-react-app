
import { Badge } from "../components";

import { GrCart } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

import { useWishlist } from "../hooks/useWishlist";

import { useDispatch } from "react-redux";

import { useUser, SignIn } from "@clerk/react";

import { useNavigate } from "react-router-dom";

const ProductCard = ({ onClick, ...product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const wishlist = useWishlist();

  const rating = product.rating;
  const fullStar = Math.floor(rating);
  const halfStar = Math.ceil(rating - fullStar);
  const emptyStar = 5 - (fullStar + halfStar);

  const isWishlist = wishlist?.some(
    (item) => item.userId === user?.id && item.id === product.id,
  );

  const handleAddToCart = (product) => {
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    dispatch(addToCart({ ...product, userId: user.id }));
  };

  const handleWishlist = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    dispatch(toggleWishlist({ ...product, userId: user.id }));
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Product Image */}
      <div
        onClick={onClick}
        className="relative flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100"
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-full w-full object-contain p-3"
        />

        <div className="absolute left-3 top-3">
          <Badge>{`${product.discountPercentage}% OFF`}</Badge>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-1 pt-3">
        <h2 className="line-clamp-1 font-semibold text-gray-900 md:text-lg">
          {product.title}
        </h2>

        <h3 className="mt-1 font-semibold text-gray-900">
          ₹{product.price}
        </h3>

        {/* Rating + Actions */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-yellow-500">
            {Array.from({ length: fullStar }).map((_, idx) => (
              <IoIosStar key={`full-${idx}`} />
            ))}

            {halfStar === 1 && <IoIosStarHalf />}

            {Array.from({ length: emptyStar }).map((_, idx) => (
              <IoMdStarOutline key={`empty-${idx}`} />
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-2">
            <span
              onClick={handleWishlist}
              className={`cursor-pointer text-lg transition ${
                isWishlist
                  ? "text-rose-500"
                  : "text-gray-500 hover:text-rose-500"
              }`}
            >
              <IoMdHeart />
            </span>

            <span
              onClick={() => handleAddToCart(product)}
              className="cursor-pointer text-lg text-gray-700 transition hover:text-black"
            >
              <GrCart />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
