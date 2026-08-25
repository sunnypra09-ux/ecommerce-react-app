import React from "react";
import { useWishlist } from "../hooks/useWishlist";

const Wishlist = () => {
  const wishlist = useWishlist();
  return <div>Wishlist</div>;
};

export default Wishlist;
