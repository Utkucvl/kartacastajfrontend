import { configureStore } from "@reduxjs/toolkit";
import earthquakeSlice from "./earthquakeSlice";
export const store = configureStore({
  reducer: {
    earthquake:earthquakeSlice
  },
});