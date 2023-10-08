import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import alertSlice from "./alert-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export default store;
