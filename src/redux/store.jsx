import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
