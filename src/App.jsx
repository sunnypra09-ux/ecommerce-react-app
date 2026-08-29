
import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import {
  Shop,
  Home,
  Cart,
  About,
  Error,
  Contact,
  Checkout,
  MyOrders,
  Wishlist,
  OrderSuccess,
  OrderDetails,
  ProductDetails,
} from "./pages";

import { Navbar, ProtectedRoute } from "./components";

import { Toaster } from "react-hot-toast";

import { useCart } from "./hooks/useCart";

import { SignIn } from "@clerk/react";

const App = () => {
  const cart = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart.items));
  }, [cart.items]);

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-gray-50 px-[2%] md:px-[3%]">
      <Navbar />

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="*" element={<Error />} />

        <Route
          path="/sign-in"
          element={<SignIn routing="path" path="/sign-in" />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/my-wishlist" element={<Wishlist />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/order-details/:orderId"
            element={<OrderDetails />}
          />

          <Route
            path="/order-success/:orderId"
            element={<OrderSuccess />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
