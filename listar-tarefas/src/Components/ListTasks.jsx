import React from "react";

const ListTasks = () => {
  return (
    <>
      <ol className="flex flex-col items-center rounded-lg bg-gray-200 h-[76%] w-[95%] overflow-y-auto py-5">
        <li className="flex justify-between bg-amber-100 h-[80px] w-[95%] mt-2 rounded">
          <div className="flex justify-center items-center w-16">
            <input
              type="checkbox"
              id="meuCheckbox"
              name="termos"
              className="cursor-pointer w-5 h-5"
            />
          </div>
          <div className="w-3/4">
            <div className="flex h-8">
              <div className="flex items-center w-1/3">
                <h2 className="font-josefin font-bold text-lg mt-2">
                  Criar Pagina de Login
                </h2>
              </div>
              <div className="flex items-center w-2/3">
                <p className="font-josefin text-sm ms-3 mt-2 text-gray-500">
                  10:00 Hr | Data: 21/03/2024
                </p>
              </div>
            </div>
            <div className="flex items-center h-11">
              <p className="font-josefin leading-none">
                Desenvolver uma página de login para o aplicativo, com campos
                para nome de usuário e senha, e opção para redefinir senha.
              </p>
            </div>
          </div>
          <div className="flex justify-evenly items-center w-40">
            <button className="bg-red-500 hover:bg-red-400 h-8 w-8 rounded font-mono font-bold">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button className="bg-green-500 hover:bg-green-400 h-8 w-8 rounded font-mono font-bold">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </div>
        </li>
        <li className="flex justify-between bg-amber-100 h-[80px] w-[95%] mt-2 rounded">
          <div className="flex justify-center items-center w-16">
            <input
              type="checkbox"
              id="meuCheckbox"
              name="termos"
              className="cursor-pointer w-5 h-5"
            />
          </div>
          <div className="w-3/4">
            <div className="flex h-8">
              <div className="flex items-center w-1/3">
                <h2 className="font-josefin font-bold text-lg mt-2">
                  Criar Pagina de Login
                </h2>
              </div>
              <div className="flex items-center w-2/3">
                <p className="font-josefin text-sm ms-3 mt-2 text-gray-500">
                  10:00 Hr | Data: 21/03/2024
                </p>
              </div>
            </div>
            <div className="flex items-center h-11">
              <p className="font-josefin leading-none">
                Desenvolver uma página de login para o aplicativo, com campos
                para nome de usuário e senha, e opção para redefinir senha.
              </p>
            </div>
          </div>
          <div className="flex justify-evenly items-center w-40">
            <button className="bg-red-500 hover:bg-red-400 h-8 w-8 rounded font-mono font-bold">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button className="bg-green-500 hover:bg-green-400 h-8 w-8 rounded font-mono font-bold">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </div>
        </li>
        <li className="flex justify-between bg-amber-100 h-[80px] w-[95%] mt-2 rounded">
          <div className="flex justify-center items-center w-16">
            <input
              type="checkbox"
              id="meuCheckbox"
              name="termos"
              className="cursor-pointer w-5 h-5"
            />
          </div>
          <div className="w-3/4">
            <div className="flex h-8">
              <div className="flex items-center w-1/3">
                <h2 className="font-josefin font-bold text-lg mt-2">
                  Criar Pagina de Login
                </h2>
              </div>
              <div className="flex items-center w-2/3">
                <p className="font-josefin text-sm ms-3 mt-2 text-gray-500">
                  10:00 Hr | Data: 21/03/2024
                </p>
              </div>
            </div>
            <div className="flex items-center h-11">
              <p className="font-josefin leading-none">
                Desenvolver uma página de login para o aplicativo, com campos
                para nome de usuário e senha, e opção para redefinir senha.
              </p>
            </div>
          </div>
          <div className="flex justify-evenly items-center w-40">
            <button className="bg-red-500 hover:bg-red-400 h-8 w-8 rounded font-mono font-bold">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button className="bg-green-500 hover:bg-green-400 h-8 w-8 rounded font-mono font-bold">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </div>
        </li>
      </ol>
    </>
  );
};

export default ListTasks;
