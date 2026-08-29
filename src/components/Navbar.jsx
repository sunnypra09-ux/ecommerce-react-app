
import React from "react";

import { Link, NavLink } from "react-router-dom";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";

import { Show, SignInButton, UserButton } from "@clerk/react";

import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useUser } from "@clerk/react";

const Navbar = () => {
  const cart = useCart();
  const wishlist = useWishlist();
  const { user } = useUser();

  const location = false;

  const myCart =
    cart.items?.filter((item) => item.userId === user?.id) ?? [];

  const myWishlist =
    wishlist?.filter((item) => item.userId === user?.id) ?? [];

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-red-500 ${
      isActive ? "font-semibold text-red-500" : "text-gray-700"
    }`;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex min-h-16 items-center justify-between gap-6 py-3">
        
        {/* Logo + Location */}
        <div className="flex items-center gap-6">
          <Link to="/" className="shrink-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <span className="font-sans text-red-600">Z</span>eptro
            </h1>
          </Link>

          <div className="hidden items-center gap-1 border-l border-gray-200 pl-5 sm:flex">
            <HiOutlineLocationMarker className="text-xl text-red-500" />

            <div className="text-sm font-medium text-gray-700">
              {location ? "Location" : "Add Location"}
            </div>

            <IoMdArrowDropdown className="cursor-pointer text-gray-500" />
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-4 text-sm font-medium md:gap-5 md:text-base">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
            </li>

            <li className="hidden md:block">
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>

            <li className="hidden md:block">
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>

            <li className="hidden lg:block">
              <NavLink to="/my-orders" className={navLinkClass}>
                My Orders
              </NavLink>
            </li>

            {/* Wishlist */}
            <li>
              <Link
                to="/my-wishlist"
                className="relative flex items-center text-xl text-gray-700 transition hover:text-red-500"
              >
                <FiHeart />

                {myWishlist.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {myWishlist.length}
                  </span>
                )}
              </Link>
            </li>

            {/* Cart */}
            <li>
              <Link
                to="/cart"
                className="relative flex items-center text-xl text-gray-700 transition hover:text-red-500"
              >
                <GrCart />

                {myCart.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {myCart.length}
                  </span>
                )}
              </Link>
            </li>

            {/* Authentication */}
            <li className="ml-1">
              <Show when="signed-out">
                <SignInButton className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600" />
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

