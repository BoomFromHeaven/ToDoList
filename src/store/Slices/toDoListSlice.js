import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("toDoList")) || {
  everyDay: [],
  global: [],
};
const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      let name = action.payload.name.trim();
      let toDoType = action.payload.toDoType;
      if (name) {
        if (toDoType == "everyDay")
          state[toDoType].push({
            name: name,
            complited: false,
            index: state[toDoType].length,
            dateOfLastComplete: "",
          });
        else
          state[toDoType].push({
            name: name,
            complited: false,
            index: state[toDoType].length,
          });
      }
      localStorage.setItem("toDoList", JSON.stringify(state));
    },
    compliteToDo: (state, action) => {
      let index = action.payload.index;
      let toDoType = action.payload.toDoType;
      let date = new Date();
      let day = date.getDate();
      state[toDoType][index].complited = !state[toDoType][index].complited;
      if (toDoType === "everyDay")
        state[toDoType][index].dateOfLastComplete = day;
      localStorage.setItem("toDoList", JSON.stringify(state));
    },
    deleteToDo: (state, action) => {
      let index = action.payload.index;
      let toDoType = action.payload.toDoType;
      state[toDoType].splice(index, 1);
      for (let i = 0; i < state[toDoType].length; i++) {
        state[toDoType][i].index = i;
      }
      localStorage.setItem("toDoList", JSON.stringify(state));
    },
    changeToDoOrder: (state, action) => {
      let index = action.payload.index;
      let toDoType = action.payload.toDoType;
      let direction = action.payload.direction;
      let name = state[toDoType][index].name;
      state[toDoType][index].name = state[toDoType][index + direction].name;
      state[toDoType][index + direction].name = name;
      let complited = state[toDoType][index].complited;
      state[toDoType][index].complited =
        state[toDoType][index + direction].complited;
      state[toDoType][index + direction].complited = complited;
      if (toDoType == "everyDay") {
        let temp = state[toDoType][index].dateOfLastComplete;
        state[toDoType][index].dateOfLastComplete =
          state[toDoType][index + direction].dateOfLastComplete;
        state[toDoType][index + direction].dateOfLastComplete = temp;
      }
      localStorage.setItem("toDoList", JSON.stringify(state));
    },
    updateEveryDayToDo: (state) => {
      let date = new Date();
      let day = date.getDate();
      state.everyDay.forEach((element) => {
        console.log(element.dateOfLastComplete);
        if (element.dateOfLastComplete != day) {
          element.complited = false;
        }
      });
    },
  },
});
export const {
  addToDo,
  compliteToDo,
  deleteToDo,
  changeToDoOrder,
  updateEveryDayToDo,
} = toDoSlice.actions;
export default toDoSlice.reducer;
