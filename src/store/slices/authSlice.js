import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,    
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user  = user;
      state.token = token;
      state.error = null;
    },
    logout: (state) => {
      state.user  = null;
      state.token = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setAuthError, clearAuthError } = authSlice.actions;

// ── Selectors ──
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user; 
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;