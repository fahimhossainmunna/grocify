import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    wishlist: [],
    showCart: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) {
        if (qty <= 0) {
          state.cartItems = state.cartItems.filter((i) => i.id !== id);
        } else {
          item.qty = qty;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((i) => i !== id);
      } else {
        state.wishlist.push(id);
      }
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    setShowCart: (state, action) => {
      state.showCart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  toggleWishlist,
  clearWishlist,
  setShowCart,
} = cartSlice.actions;

// ── Selectors ──
export const selectCartItems   = (state) => state.cart.cartItems;
export const selectWishlist    = (state) => state.cart.wishlist;
export const selectShowCart    = (state) => state.cart.showCart;
export const selectCartCount   = (state) => state.cart.cartItems.reduce((acc, i) => acc + i.qty, 0);
export const selectCartTotal   = (state) => state.cart.cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);

export default cartSlice.reducer;