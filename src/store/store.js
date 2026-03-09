import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import { grocifyApi } from "./api/grocifyApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [grocifyApi.reducerPath]: grocifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(grocifyApi.middleware),
});

export default store;