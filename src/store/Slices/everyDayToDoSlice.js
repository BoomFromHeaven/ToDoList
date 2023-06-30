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
        index:state.length
      });
      localStorage.setItem("everyDay", JSON.stringify(state));
    },
    CompliteEveryDayToDo: (state, action) => {
      let date=new Date();
      let day=date.getDate();
      state.forEach((element) => {
        if (element.name == action.payload)
          {
          element.complited = !element.complited;
          element.dateOfLastComplete=day;
          }
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
    ChangeEveryDayOrder:(state,action)=>{
      let name=state[action.payload.index].name;
      state[action.payload.index].name=state[action.payload.index+action.payload.direction].name;
      state[action.payload.index+action.payload.direction].name=name;
      name=state[action.payload.index].complited;
      state[action.payload.index].complited=state[action.payload.index+action.payload.direction].complited;
      state[action.payload.index+action.payload.direction].complited=name;
    },
    UpdateEveryDayToDo:(state)=>{
      let date=new Date();
      let day=date.getDate();
      state.forEach((element)=>{
        if(element.dateOfLastComplete!=day){
          element.complited=false;
        }
      })
    }
  },
});
export const { AddEveryDayToDo, CompliteEveryDayToDo, DeleteEveryDayToDo,ChangeEveryDayOrder,UpdateEveryDayToDo } =
  EveryDayToDoSlice.actions;
export default EveryDayToDoSlice.reducer;
