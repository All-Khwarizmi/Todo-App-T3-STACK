import { contextProps } from "@trpc/react-query/shared";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "../utils/api";

const Todos = ({ todo }: any) => {
  console.log(todo);
  const ctx = api.useContext();
  const { mutate } = api.todo.startTodo.useMutation({
    onSuccess: () => ctx.todo.getTodos.refetch(),
  });
  const startHandler = (todo: any) => {
    console.log(todo, todo.target.name);
    return mutate({ name: todo.target.name });
  };
  return (
    <div  className="text-1xl text-white">
      <div
        key={todo.id}
        className="container flex items-center justify-center gap-12 px-4"
      >
        <button
          name={todo.name}
          type="button"
          onClick={(todo) => startHandler(todo)}
        >
          DONE
        </button>
      </div>
    </div>
  );
};

const DeleteTodo = ({todo}: any) => {
 const ctx = api.useContext();
 const { mutate } = api.todo.deleteTodo.useMutation({
   onSuccess: () => ctx.todo.getTodos.refetch(),
 });

 const deleteHandler = (todo: any) => {
   console.log(todo, todo.target.name);
   return mutate({ name: todo.target.name });
 };


 return (
   <div  className="flex text-1xl flex-row gap-3 md:grid-cols-3">
     <p className="w-2/3 ">{todo.name}</p>
     <button
       name={todo.name}
       onClick={(todo) => {
         return deleteHandler(todo);
       }}
       className="container flex items-center bg-green-800 w-1/3 justify-center gap-12 px-4"
     >
       DELETE
     </button>
   </div>
 );

}

const Canva = () => {
  const todos = api.todo.getTodos.useQuery();

  const ctx = api.useContext();
  const { mutate } = api.todo.deleteTodo.useMutation({
    onSuccess: () => ctx.todo.getTodos.refetch(),
  });

  const deleteHandler = (todo: any) => {
    console.log(todo, todo.target.name);
    return mutate({ name: todo.target.name });
  };


  return (
    <div className="w-300 h-200 grid min-h-full grid-cols-2 gap-5 text-white">
      <div className="w-90 h-200 min-h-max rounded bg-pink-500  p-3  ">
        <p>Not Started</p>
        <br />
        {todos?.data?.map((todo) => {
          if (todo.status === "TODO") {
            return (
              <div key={todo.id} className="flex text-1xl flex-row gap-3 md:grid-cols-3">
                <p className="w-2/3">{todo.name}</p>
                <button
                  name={todo.name}
                  onClick={(todo) => {
                    return deleteHandler(todo);
                  }}
                  className="text-white-500 text-extra-bold bg-red-500 p-1"
                >
                  X
                </button>
                <Todos todo={todo} />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="w-90 h-200 min-h-max rounded bg-green-300 p-3  ">
        <p>Done</p>
        {todos?.data?.map((todo, index) => {
          if (todo.status === "DONE") {
            return (
              <div key={index} className='pt-5'>
                <DeleteTodo todo={todo} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const DeleteAllTodos = () => {
  const ctx = api.useContext();
  const { mutate } = api.todo.deleteAll.useMutation({
    onSuccess: () => ctx.todo.getTodos.refetch(),
  });

  const deleteAll = async () => {
    mutate();
  };
  return (
    <div className="bg-red-500 p-2">
      <button className="bg-red text-white" onClick={deleteAll}>
        Delete All Todos
      </button>
    </div>
  );
};

const AddButton = () => {
  const [name, setName] = useState("");
  const ctx = api.useContext();
  const { mutate } = api.todo.addTodo.useMutation({
    onSuccess: () => ctx.todo.getTodos.refetch(),
  });

  const handleName = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  };
  // console.log(todos)
  const handleAdd = () => {
    mutate({ text: name });
  };
  return (
    <form className="tewt-white flex">
      <input
        placeholder="Name"
        autoFocus
        className="rounded"
        value={name}
        type="text"
        onChange={(e) => handleName(e)}
      />
      <button
      type="button"
        className="rounded bg-blue-500 p-2 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleAdd}
      >
        Add Todo
      </button>
    </form>
  );
};

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
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Todo App
          </h2>
          <p className="text-2xl text-white"></p>
          <AddButton />
          <DeleteAllTodos />

          <div className="h-40 w-full rounded">
            <Canva />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
