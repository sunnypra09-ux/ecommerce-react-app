import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { useCart } from "../hooks/useCart";
import { FiHeart } from "react-icons/fi";

import { useWishlist } from "../hooks/useWishlist";
import { useUser } from "@clerk/react";

const Navbar = () => {
  const cart = useCart();
  const wishlist = useWishlist();
  const { user } = useUser();
  const location = false;
  console.log(cart);

  const myCart = cart.items?.filter((item) => item.userId === user?.id) ?? [];
  const myWishlist = wishlist?.filter((item) => item.userId === user?.id) ?? [];

  return (
    <div className="flex items-center justify-between py-2 md:py-3 bg-white">
      {/* logo */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <h1 className="text-3xl font-bold">
            <span className="text-red-600 font-sans">Z</span>eptro
          </h1>
        </Link>
        <div className="flex items-center">
          <HiOutlineLocationMarker className="text-xl text-red-400" />
          <div>{location ? "Location" : "Add Location"}</div>
          <IoMdArrowDropdown className="cursor-pointer" />
        </div>
      </div>
      <div>
        <ul className="flex items-center gap-3 text-[18px]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-semibold text-red-500 underline" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? "font-semibold text-red-500 underline" : ""
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "font-semibold text-red-500 underline" : ""
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "font-semibold text-red-500 underline" : ""
              }
            >
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? "font-semibold text-red-500 underline" : ""
              }
            >
              My Orders
            </NavLink>
          </li>

          <li>
            <Link to="/my-wishlist" className="relative">
              <FiHeart />
              {myWishlist.length > 0 && (
                <span className="absolute -top-4 -right-1 h-3 w-3 bg-red-500 rounded-full text-white flex items-center justify-center text-xs p-2 ">
                  {myWishlist.length}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link to="/cart" className="relative">
              <GrCart />
              {myCart.length > 0 && (
                <span className="absolute -top-4 -right-1 h-3 w-3 bg-red-500 rounded-full text-white flex items-center justify-center text-xs p-2 ">
                  {myCart.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Show when="signed-out">
              <SignInButton className="text-white bg-red-500 rounded px-2 py-1 text-sm cursor-pointer" />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
