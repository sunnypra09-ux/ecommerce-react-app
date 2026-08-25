import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: savedCart,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const exitsproduct = state.items.find(
        (element) => element.id === product.id,
      );

      if (exitsproduct) {
        exitsproduct.quantity += 1;
        toast("Product already added to cart", {
          icon: <IoWarning />,
        });
      } else {
        state.items.push({ ...product, quantity: 1 });
        toast.success("Product added to cart!");
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (!product) {
        return;
      } else {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (!product) {
        return;
      } else if (product.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        product.quantity -= 1;
      }
    },
    clearCart: (state) => {
      ((state.items = []), (state.totalitems = 0), (state.totalprice = 0));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
