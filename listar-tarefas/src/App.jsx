import React from "react";
import Tasks from "./Components/Tasks";
import { TasksProvider } from "./TasksContext";

const App = () => {
  return (
    <TasksProvider>
      <Tasks />
    </TasksProvider>
  );
};

export default App;
