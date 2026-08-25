import { createSlice } from "@reduxjs/toolkit";

const saveWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlist.find((item) => item.id === product.id);

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== product.id,
        );
      } else {
        state.wishlist.push(product);
      }
      saveWishlist(state.wishlist);
    },
  },
});

export default wishlistSlice.reducer;
export const { toggleWishlist } = wishlistSlice.actions;
