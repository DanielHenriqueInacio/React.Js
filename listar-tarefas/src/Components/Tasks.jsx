import React from 'react'
import ListTasks from './ListTasks'

const Tasks = () => {
  return (
    <>
      <h1 className="font-serif text-6xl text-center mb-[3%]">Tarefas</h1>
      <main className="flex flex-col justify-center items-center rounded-lg bg-orange-100 h-[79vh] w-[50vw]">
        <div className="flex justify-between rounded-lg h-[5%] w-[95%] mb-3">
          <select name="" id="" className="border border-black text-center bg-gray-300 hover:bg-gray-400 rounded font-mono font-bold cursor-pointer">
            <option value="">Total</option>
            <option value="">Pendentes</option>
            <option value="">Finalizadas</option>
          </select>

          <button className="bg-sky-400 hover:bg-sky-500 w-28 rounded font-mono font-bold">Cadastrar</button>
        </div>
        
        <ListTasks />

        <section className="rounded-lg bg-gray-200 h-[8%] w-[95%] mt-3">

        </section>
      </main>
    </>
  )
}

export default Tasks
