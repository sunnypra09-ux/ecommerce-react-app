import { useSelector } from "react-redux";

export const useWishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  return wishlist;
};
