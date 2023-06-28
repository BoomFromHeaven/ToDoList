import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("everyDay")) || [];
const EveryDayToDoSlice = createSlice({
  name: "EveryDayToDoSlice",
  initialState,
  reducers: {
    AddEveryDayToDo: (state, action) => {
      state.push({
        complited: false,
        name: action.payload,
        dateOfLastComplete: "now",
      });
      localStorage.setItem("everyDay", JSON.stringify(state));
    },
    CompliteEveryDayToDo: (state, action) => {
      state.forEach((element) => {
        if (element.name == action.payload)
          element.complited = !element.complited;
      });
      localStorage.setItem("everyDay", JSON.stringify(state));
    },
    DeleteEveryDayToDo: (state, action) => {
      const index = state.findIndex((object) => {
        return object.name === action.payload;
      });
      state.splice(index, 1);
      localStorage.setItem("everyDay", JSON.stringify(state));
    },
  },
});
export const { AddEveryDayToDo, CompliteEveryDayToDo, DeleteEveryDayToDo } =
  EveryDayToDoSlice.actions;
export default EveryDayToDoSlice.reducer;
