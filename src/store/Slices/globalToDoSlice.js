import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("Global")) || [];
const GlobalToDoSlice = createSlice({
  name: "GlobalToDoSlice",
  initialState,
  reducers: {
    AddGlobalToDo: (state, action) => {
      state.push({
        complited: false,
        name: action.payload,
        index:state.length
      });
      localStorage.setItem("Global", JSON.stringify(state));
    },
    CompliteGlobalToDo: (state, action) => {
      state.forEach((element) => {
        if (element.name == action.payload)
          element.complited = !element.complited;
      });
      localStorage.setItem("Global", JSON.stringify(state));
    },
    DeleteGlobalToDo: (state, action) => {
      const index = state.findIndex((object) => {
        return object.name === action.payload;
      });
      state.splice(index, 1);
      localStorage.setItem("Global", JSON.stringify(state));
    },
    ChangeGlobalOrder:(state,action)=>{
      let name=state[action.payload.index].name;
      state[action.payload.index].name=state[action.payload.index+action.payload.direction].name;
      state[action.payload.index+action.payload.direction].name=name;
    }
  },
});
export const { AddGlobalToDo, CompliteGlobalToDo, DeleteGlobalToDo,ChangeGlobalOrder } =
  GlobalToDoSlice.actions;
export default GlobalToDoSlice.reducer;
