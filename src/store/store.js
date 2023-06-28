import { configureStore } from "@reduxjs/toolkit";
import everyDayToDoSlice from "./Slices/everyDayToDoSlice";
import globalToDoSlice from "./Slices/globalToDoSlice";
export const store = configureStore({
  reducer: {
    everyDayToDo:everyDayToDoSlice,
    globalToDo:globalToDoSlice,
  },
});
export default store;