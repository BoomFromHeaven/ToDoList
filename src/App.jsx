import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { updateEveryDayToDo } from "./store/Slices/toDoListSlice";
import ToDoList from "./content/ToDoList";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateEveryDayToDo());
  });
  return (
    <div>
      <ToDoList></ToDoList>
    </div>
  );
}

export default App;
