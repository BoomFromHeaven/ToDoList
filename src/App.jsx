import { useEffect } from "react";
import "./App.css";
import Content from "./content/content";
import { useDispatch } from "react-redux";
import { UpdateEveryDayToDo } from "./store/Slices/everyDayToDoSlice";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(UpdateEveryDayToDo())
  })
  return <Content></Content>;
}

export default App;
