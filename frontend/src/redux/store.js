import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from "./medicineSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"
// Central store that holds all the app state
export const store = configureStore({
  reducer: {
    medicine: medicineReducer,
    cart: cartReducer,
    auth: authReducer
  }
});