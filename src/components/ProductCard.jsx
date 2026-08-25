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
    <div className="w-full bg-amber-100 p-2 rounded ">
      <div
        onClick={onClick}
        className="relative h-40 bg-gray-200 flex items-center justify-center cursor-pointer"
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-contain"
        />

        <p className="absolute top-3 left-3">
          <Badge>{`${product.discountPercentage}% OFF`}</Badge>
        </p>
      </div>

      <div className=" pt-3">
        <h2 className="line-clamp-1 font-semibold md:text-xl">
          {product.title}
        </h2>

        <h3 className="font-semibold">₹{product.price}</h3>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {Array.from({ length: fullStar }).map((_, idx) => (
              <IoIosStar key={`full-${idx}`} />
            ))}

            {halfStar === 1 && <IoIosStarHalf />}

            {Array.from({ length: emptyStar }).map((_, idx) => (
              <IoMdStarOutline key={`empty-${idx}`} />
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded bg-rose-200 p-2">
            <span
              onClick={handleWishlist}
              className={`${isWishlist ? "text-rose-500" : "text-white"} cursor-pointer`}
            >
              <IoMdHeart />
            </span>
            <span
              onClick={() => handleAddToCart(product)}
              className="cursor-pointer"
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
