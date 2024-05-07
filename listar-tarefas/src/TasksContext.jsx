import React from "react";
import { getTasks, updateTaskStatus } from "./Services/tasksService";

const TasksContext = React.createContext();

export const TasksProvider = ({ children }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getTasks();
        setData(fetchedTasks);
      } catch (e) {
        console.log("Erro ao buscar Tarefas", e);
      }
    }
    fetchTasks();
  }, []);

  async function handleCheckBox(taskId, isChecked) {
    const updatedStatus = isChecked ? "Finalizado" : "Pendente";
    try {
      await updateTaskStatus(taskId, updatedStatus);
      const updatedTasks = data.map((task) =>
        task.id === taskId ? { ...task, status: updatedStatus } : task
      );
      setData(updatedTasks);
    } catch (e) {
      console.log("Erro ao atualizar tarefa:", e);
    }
  }

  const getTaskCounts = () => {
    const pendingCount = data.filter(
      (task) => task.status === "Pendente"
    ).length;
    const completedCount = data.filter(
      (task) => task.status === "Finalizado"
    ).length;
    const totalCount = data.length;

    return {
      pendingCount,
      completedCount,
      totalCount,
    };
  };

  return (
    <TasksContext.Provider value={{ data, handleCheckBox, getTaskCounts }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => React.useContext(TasksContext);