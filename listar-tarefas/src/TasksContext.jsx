import React from "react";
import {
  deleteTask,
  getTasks,
  registerTask,
  updateTask,
  updateTaskStatus,
} from "./Services/tasksService";

const TasksContext = React.createContext();

export const TasksProvider = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [filterType, setFilterType] = React.useState('');

  const openModal = (taskId) => {
    setModalOpen(taskId);
    setFormData(taskId ? { id: taskId } : "");
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  React.useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getTasks(filterType);
        console.log("Tarefas buscadas", fetchedTasks)
        setData(fetchedTasks);
      } catch (e) {
        console.log("Erro ao buscar Tarefas", e);
      }
    }
    fetchTasks();
  }, [filterType]);

  console.log("Filtrar o Tipo", filterType)

  async function handleRegisterTask(event, title, description) {
    event.preventDefault();
    try {
      const newTask = await registerTask(title, description);
      setData([...data, newTask]);
    } catch (e) {
      console.log("Erro ao cadastrar Filme", e);
    }
  }

  async function handleCheckbox(taskId, isChecked) {
    const updatedStatus = isChecked ? "Finalizado" : "Pendente";
    try {
      await updateTaskStatus(taskId, updatedStatus);
      const updateStatus = data.map((task) =>
        task.id === taskId ? { ...task, status: updatedStatus } : task
      );
      setData(updateStatus);
    } catch (e) {
      console.log("Erro ao atualizar tarefa:", e);
    }
  }

  async function handleTaskUpdate(event, taskId) {
    event.preventDefault();
    try {
      const updatedTask = { ...formData, date: new Date().toLocaleDateString(), hour: new Date().toLocaleTimeString() };
      const taskUpdate = await updateTask(updatedTask.id, updatedTask);
      const updatedTasks = data.map((task) =>
        task.id === taskId ? { ...task, ...taskUpdate } : task
      );
      setData(updatedTasks);
      closeModal(true);

      const fetchedTasks = await getTasks();
      setData(fetchedTasks);
    } catch (e) {
      console.log("Erro ao atualizar tarefa:", e);
    }
  }

  async function handleTaskDelete(taskId) {
    try {
      const sholdDelete = window.confirm(
        "Tem certeza que deseja excluir esta tarefa?"
      );
      if (sholdDelete) {
        await deleteTask(taskId);
        const updatedTask = data.filter((task) => task.id !== taskId);
        setData(updatedTask);
      }
    } catch (e) {
      console.log("Erro ao deletar tarefa:", e);
    }
  }

  function handleChange({ target }) {
    const { name, value } = target;
    const formFields = { ...formData, [name]: value };

    setFormData(formFields);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { title, description } = formData;
    try {
      await handleRegisterTask(event, title, description);
      closeModal();
      setFormData({ title: "", description: "" });
    } catch(e) {
      console.log("Erro ao cadastrar tarefa:", e);
    }
  }

  function handleFilterChange(event) {
    const selectedFilter = event.target.value;
    console.log("Está vindo", selectedFilter)
    setFilterType(selectedFilter);
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
      filterType,
    };
  };

  return (
    <TasksContext.Provider
      value={{
        data,
        handleSubmit,
        handleTaskUpdate,
        handleCheckbox,
        handleTaskDelete,
        getTaskCounts,
        handleChange,
        modalOpen,
        openModal,
        closeModal,
        formData,
        handleFilterChange,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => React.useContext(TasksContext);
