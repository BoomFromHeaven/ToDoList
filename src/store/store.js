import { configureStore } from "@reduxjs/toolkit";
import toDoListSlice from "./Slices/toDoListSlice";
export const store = configureStore({
  reducer: {
    toDoList: toDoListSlice,
  },
});
export default store;
