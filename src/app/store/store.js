import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../features/cart/cartSlice";
import orderReducer from "../../features/order/orderSlice";
import wishlistReducer from "../../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
  },
});
