import { TiPencil } from "react-icons/ti";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import TodoBox from "./TodoBox";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { data } from "react-router-dom";

interface IGetTodos {
    id: number;
    message: string;
    isComplete: boolean
}

interface ISearchProps {
  searchTerm: string
}


const fetchTodos = async() => {
  const response = await axios.get<IGetTodos[]>("https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items")
  return response.data
}

const deleteTodos = async(id:number) => {
  const response = await axios.delete(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${id}`)
  return response.data
}

const updateTodoComplete = async(updateTodo:IGetTodos) => {
  const response = await axios.put(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${updateTodo.id}`,updateTodo)
  return response.data
}


function TaskFeild({searchTerm}:ISearchProps) {

    const [openTodo , setOpenTodo] = useState(false)
    const [editSwitch, setEditSwitch] = useState(false)
    const [selectedTodoId , setSelectedTodoId] = useState<number | null>(null)
  

    const openTodoHandle = () => {
        setOpenTodo((prev) => !prev);
        setEditSwitch(false)
        setSelectedTodoId(null)
    }

    const {data: todoData, isLoading,isError,error,refetch} = useQuery<IGetTodos[]>({
        queryFn: fetchTodos,
        queryKey: ['todos'],
        
        
    })

      console.log(todoData);

    const {mutate:deleteMutate} = useMutation({
        mutationFn: deleteTodos,
        onSuccess: (dataDeleted) => {
          console.log("deleted Data",dataDeleted);
          refetch()
        } 
    })

    const queryClient = useQueryClient()

    const {mutate:updateComplete} = useMutation({
      mutationFn: updateTodoComplete,
      onSuccess: () => {

      }

    })

    const clickCheckBox = (todo:IGetTodos) => {
      const updatedTodoComplete = {
        ...todo,
        isComplete: !todo.isComplete,
      }
      
      updateComplete(updatedTodoComplete)
      const newData = todoData?.map(item =>
        item.id === updatedTodoComplete.id ? updatedTodoComplete : item
      );
     

      queryClient.setQueryData(['todos'],newData
      )
    }

    const filterTodos = todoData?.filter((todo) => 
      todo.message.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

    const deleteHandle = (id:number) => {
        deleteMutate(id) 
    }

    const editHandle =(id:number) => {
      setEditSwitch(true)
      setSelectedTodoId(id)
      setOpenTodo(true)
    } 


    if(isError) return <div>Error Fetch Data: {error.message}</div>
    if(isLoading) return <div>Loading ...</div>

  return (
    <>
        <div  className='flex flex-col space-y-4 w-3/4 mt-5 divide-y divide-primary select-none '>

            {filterTodos && ( filterTodos.map((data) => 
              (
                <div key={data.id} className="flex justify-between items-center pb-4">
                <div className="flex items-center gap-5">
                    <span className={`w-5 h-5 flex items-center justify-center  rounded-[2px] border border-primary cursor-pointer ${data.isComplete ? "bg-primary" : "bg-white"}`} onClick={() => clickCheckBox(data)} >
                    {data.isComplete ? <FaCheck color="white" /> : ""}
                    </span>
                    <span  className={`text-xl font-bold ${data.isComplete ? "line-through text-gray-400" : ""}`}>{data.message}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 *:cursor-pointer">
                    <TiPencil className="hover:text-primary" onClick={() => editHandle(data.id)} />
                    <CiTrash onClick={() => deleteHandle(data.id)} className="hover:text-red-500" />
                </div>
            </div>
              )
            )

            )}

        </div>

            <div onClick={openTodoHandle} className="w-12 h-12 flex justify-center items-center fixed bottom-20 right-140 text-white bg-primary rounded-full hover:bg-acccent cursor-pointer">
                <FaPlus size={24}/>
            </div>
            {(openTodo || editSwitch) && (
                <TodoBox setOpenTodo={setOpenTodo} setEditSwitch={setEditSwitch} refetchTodos={refetch} selectedTodoId={selectedTodoId} />
            )}
    </>
  )
}

export default TaskFeild