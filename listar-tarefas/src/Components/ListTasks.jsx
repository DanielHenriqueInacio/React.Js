import React from "react";
import { useTasks } from "../TasksContext";
import Modal from "./Modal";
import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Button from "./Form/Button";

const ListTasks = () => {
  const { data, handleCheckBox } = useTasks();
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = (taskId) => {
    setModalOpen(taskId);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return (
    <>
      <ol className="flex flex-col items-center rounded-lg bg-gray-200 h-[76%] w-[95%] overflow-y-auto py-5">
        {data &&
          data.map((item) => (
            <li
              key={item.id}
              className="flex justify-between bg-amber-100 h-[80px] w-[95%] mt-2 rounded"
            >
              <div className="flex justify-center items-center w-16">
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  name="check"
                  className="cursor-pointer w-5 h-5"
                  checked={item.status === "Finalizado"}
                  onChange={({ target }) =>
                  handleCheckBox(item.id, target.checked)
                  }
                />
              </div>
              <div className="w-3/4">
                <div className="flex h-8">
                  <div className="flex items-center w-2/3">
                    <h2 className="font-josefin font-bold text-lg mt-2">
                      {item.title}
                    </h2>
                  </div>
                  <div className="flex items-center w-1/3">
                    <p className="font-josefin text-sm ms-3 mt-2 text-gray-500">
                      {`Data: ${item.date} | Hora: ${item.hour}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center h-11">
                  <p className="font-josefin leading-none">{item.task}</p>
                </div>
              </div>
              <div className="flex justify-evenly items-center w-36">
                <button className="bg-red-500 hover:bg-red-400 h-8 w-8 rounded font-mono font-bold">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <button
                  onClick={() => openModal(item.id)}
                  className="bg-green-500 hover:bg-green-400 h-8 w-8 rounded font-mono font-bold"
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
                {modalOpen === item.id && (
                  <Modal isOpen={true} onClose={closeModal}>
                    <form
                      className="flex flex-col justify-center items-center h-full"
                      action=""
                    >
                      <Input label="Título" type="text" name="title" />
                      <Textarea label="Tarefa" name="task" />
                      <Button>Salvar</Button>
                    </form>
                  </Modal>
                )}
              </div>
            </li>
          ))}
      </ol>
    </>
  );
};

export default ListTasks;
