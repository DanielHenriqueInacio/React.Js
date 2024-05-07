import React from "react";
import ListTasks from "./ListTasks";
import Modal from "./Modal";
import { useTasks } from "../TasksContext";
import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Button from "./Form/Button";

const Tasks = () => {
  const { getTaskCounts } = useTasks();
  const { pendingCount, completedCount, totalCount } = getTaskCounts();
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h1 className="font-serif text-6xl text-center mb-[3%]">Tarefas</h1>
      <main className="flex flex-col justify-center items-center rounded-lg bg-orange-100 h-[79vh] w-[50vw]">
        <div className="flex justify-between rounded-lg h-[5%] w-[95%] mb-3">
          <select
            name="selectStatus"
            id="statusSelect"
            className="border border-black text-center bg-gray-300 hover:bg-gray-400 rounded font-mono font-bold cursor-pointer"
          >
            <option value="">Total</option>
            <option value="">Pendentes</option>
            <option value="">Finalizadas</option>
          </select>

          <button
            id="Register"
            className="bg-sky-400 hover:bg-sky-500 w-28 rounded font-mono font-bold"
            onClick={openModal}
          >
            Cadastrar
          </button>
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <form className="flex flex-col justify-center items-center h-full" action="">
              <Input label="Título" type="text" name="title"/>
              <Textarea label="Tarefa" name="task"/>
              <Button>Salvar</Button>
            </form>
          </Modal>
        </div>

          <ListTasks />

        <section className="flex justify-around items-center rounded-lg bg-gray-200 h-[8%] w-[95%] mt-3">
          <div>
            <p className="font-josefin font-bold text-lg">Total: {totalCount}</p>
          </div>
          <div>
            <p className="font-josefin font-bold text-lg">Pendentes: {pendingCount}</p>
          </div>
          <div>
            <p className="font-josefin font-bold text-lg">Finalizadas: {completedCount}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Tasks;
