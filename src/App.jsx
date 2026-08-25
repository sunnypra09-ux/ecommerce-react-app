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
  OrderSuccess,
  OrderDetails,
  ProductDetails,
} from "./pages";
import { Navbar, ProtectedRoute } from "./components";
import { Toaster } from "react-hot-toast";
import { useCart } from "./hooks/useCart";

const App = () => {
  const cart = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart.items));
  }, [cart.items]);

  return (
    <div className="max-w-7xl mx-auto  px-[2%] md:px-[3%] bg-gray-400 min-h-screen">
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="*" element={<Error />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
