import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("AUTH_TOKEN"),
  isAuthenticated: false,
  loading: true,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    USER_LOADED(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },

    REGISTER_SUCCESS(state, action) {
      state.token = localStorage.setItem("AUTH_TOKEN", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
    },
    LOGOUT_OR_FAIL(state) {
      localStorage.removeItem("AUTH_TOKEN");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
