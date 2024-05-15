import React from "react";
import { useTasks } from "../TasksContext";
import Modal from "./Modal";
import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Button from "./Form/Button";

const ListTasks = () => {
  const {
    data,
    handleTaskUpdate,
    handleCheckbox,
    handleTaskDelete,
    handleChange,
    getTaskCounts,
    modalOpen,
    openModal,
    closeModal,
    loading,
  } = useTasks();
  const { filterType } = getTaskCounts();

  console.log("Filtrar Tipo", filterType)

  const filteredTasks = data.filter((task) => {
    if (filterType === "") {
      return true;
    }
    return task.status === filterType;
  });

  console.log("Filtered Tasks", filteredTasks)
  console.log("DATA", data)
  return (
    <>
      <ol className="flex flex-col items-center rounded-lg bg-gray-200 h-[76%] w-[95%] overflow-y-auto py-5">
        {filteredTasks &&
          filteredTasks.map((item) => (
            <li
              key={item.id}
              className="flex justify-between bg-amber-100 h-[120px] w-[95%] py-3 my-1 rounded"
            >
              <div className="flex justify-center items-center w-16">
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  name="status"
                  className="cursor-pointer w-5 h-5"
                  defaultChecked={item.status === "Finalizado"}
                  defaultValue={item.status}
                  onChange={({ target }) =>
                    handleCheckbox(item.id, target.checked)
                  }
                />
              </div>

              <div className="w-3/4">
                <div className="flex items-center">
                  <p className="font-josefin text-sm text-gray-500">
                    {`Data: ${item.date} | Hora: ${item.hour}`}
                  </p>
                </div>

                <div className="flex items-center">
                  <h2 className="font-josefin font-bold text-lg">
                    {item.title}
                  </h2>
                </div>

                <div className="flex items-center h-11">
                  <p className="font-josefin leading-none">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-evenly items-center w-36">
                <button
                  onClick={() => handleTaskDelete(item.id)}
                  className="bg-red-500 hover:bg-red-400 h-8 w-8 rounded font-mono font-bold"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <button
                  onClick={() => openModal(item.id)}
                  className="bg-green-500 hover:bg-green-400 h-8 w-8 rounded font-mono font-bold"
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
                {modalOpen === item.id && (
                  <Modal
                    key={item.id}
                    id={item.id}
                    isOpen={true}
                    onClose={closeModal}
                  >
                    <form
                      className="flex flex-col justify-center items-center h-full"
                      onSubmit={handleTaskUpdate}
                    >
                      <Input
                        label="Título"
                        type="text"
                        name="title"
                        defaultValue={item.title}
                        onChange={handleChange}
                      />
                      <Textarea
                        label="Descrição"
                        name="description"
                        defaultValue={item.description}
                        onChange={handleChange}
                      />
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
