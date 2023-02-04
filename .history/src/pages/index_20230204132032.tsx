import { contextProps } from "@trpc/react-query/shared";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "../utils/api";

const Todos = () => {
  const todos = api.todo.getTodos.useQuery()
  const ctx = api.useContext()
  const { mutate } = api.todo.deleteTodo.useMutation({
    onSuccess : () => ctx.todo.getTodos.refetch()
  })
  const deleteHandler = (todo: any) => {
    console.log(todo, todo.target.name)
    return mutate({name : todo.target.name})
   
  }
  return (
    <>
    <div className="text-white text-2xl">
      {/* {todos.data ? todos.data. : "Loading..."} */}
    {todos.data?.map((todo, index) => {
       return (
        <div key={index}>
        <div className="container flex items-center justify-center gap-12 px-4">
           <p > {todo.name} </p>
           <button 
           name={todo.name}
           type="button" 
           onClick={(todo) => deleteHandler(todo) }>X</button>
        </div>
       
        <br />
        </div>
       
       )
    })}
    </div>
  
    </>
  )
}

const Canva = () => {
  const todos = api.todo.getTodos.useQuery();
  const ctx = api.useContext();

  return (
    <div className="grid grid-cols-3 w-300 h-200 min-h-full gap-5 text-white">

      
      <div className="w-90 h-200 min-h-max bg-gray-500  p-3  ">
        <p>Not Started</p>
      </div>
      <div className="w-90 h-200 min-h-max bg-gray-500 p-3  ">
        <p>Started</p>
      </div>
      <div className="w-90 h-200 min-h-max bg-gray-500 p-3  ">
        <p>Done</p>
      </div>
    </div>
  );
}

const DeleteAllTodos = () => {
  const ctx = api.useContext()
 const {mutate} = api.todo.deleteAll.useMutation({
  onSuccess: () => ctx.todo.getTodos.refetch()
 })

const deleteAll = async () => {
 mutate()
}
  return (
    <div className="bg-red-500 p-2">
        <button
    className="bg-red text-white"
     onClick={deleteAll}>
      Delete All Todos
    </button>
    </div>
  
  )

}

const AddButton = () => {
  const [name, setName] = useState("")
  const ctx = api.useContext()
  const {mutate} = api.todo.addTodo.useMutation({onSuccess: () => ctx.todo.getTodos.refetch() })

const handleName = (e: any) => {
  e.preventDefault()
  console.log(e.target.value)
  setName(e.target.value)
}
  // console.log(todos)
const handleAdd = () => {
  mutate({text: name})
}
 return(
  <form className="flex tewt-white" >
    <input 
    placeholder="Name"
    autoFocus
    className="rounded"
    value={name}
    type="text"
    onChange={(e) => handleName(e)} />
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 p-2 rounded" onClick={ handleAdd}>
            Add Todo
          </button>
  </form>
   
 )
}

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
      
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
             
          </h1>
     <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]" >Todo App</h2>
          <p className="text-2xl text-white">
            
          </p>
         <AddButton />
         <DeleteAllTodos />
          <Todos />
          <div className="h-40 w-full">

          <Canva />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
