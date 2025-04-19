import { TiPencil } from "react-icons/ti";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import TodoBox from "./TodoBox";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {IGetTodos,ISearchProps,IFilter} from '../types/type'
import {fetchTodos,deleteTodos,updateTodoComplete} from '../api/axiosApi'




function TaskFeild({searchTerm,todoFilter}:ISearchProps & IFilter) {

      const queryClient = useQueryClient()


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

    const {mutate:deleteMutate} = useMutation({
        mutationFn: deleteTodos,
        onSuccess: (_,deletedId) => {
          queryClient.setQueryData<IGetTodos[]>(['todos'], (oldData) => {
            if(!oldData) return [];
            return oldData.filter((todo) => todo.id !== deletedId)
          })
        } 
    })

    const {mutate:updateComplete} = useMutation({
      mutationFn: updateTodoComplete,
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
     

      queryClient.setQueryData(['todos'],newData)
    }

    //serach Term
    const searchFilterTodos = todoData?.filter((todo) => 
      todo.message.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())

    )
    
    //Filter Term
    const filterTodos = searchFilterTodos?.filter((todo) => {
      
      if(todoFilter === "Complete"){
        return todo.isComplete
      }else if(todoFilter === 'Incomplete'){
        return !todo.isComplete
      }else{
        return true
      }

    }
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
    if(isLoading) return <div className="w-full text-center mt-20"><span className="w-[60px] loading loading-spinner text-acccent "></span></div>

  return (
    <>
        <div  className='flex flex-col space-y-4 w-3/4 mt-6 divide-y divide-primary select-none max-xs:w-full max-xs:pt-3 '>

            {filterTodos && ( filterTodos.map((data) => 
              (
                <div key={data.id} className="flex justify-between items-center pb-4">
                <div className="flex items-center gap-5">
                    <span className={`min-w-5 min-h-5 flex items-center justify-center  rounded-[2px] border border-primary cursor-pointer ${data.isComplete ? "bg-primary" : "bg-white"}`} onClick={() => clickCheckBox(data)} >
                    {data.isComplete ? <FaCheck color="white" /> : ""}
                    </span>
                    <p className={`text-xl max-xs:text-lg font-bold break-all ${data.isComplete ? "line-through text-gray-400" : ""}`}>{data.message}</p>
                </div>
                <div className="flex items-center gap-3 text-gray-400 pl-5 *:cursor-pointer">
                    <TiPencil className="hover:text-primary" onClick={() => editHandle(data.id)} />
                    <CiTrash onClick={() => deleteHandle(data.id)} className="hover:text-red-500" />
                </div>
            </div>
              )
            )

            )}

        </div>

            <div onClick={openTodoHandle} className="w-12 h-12 flex justify-center items-center fixed bottom-20 max-xs:right-5 right-140 text-white bg-primary rounded-full hover:bg-acccent cursor-pointer">
                <FaPlus size={24}/>
            </div>
            {(openTodo || editSwitch) && (
                <TodoBox setOpenTodo={setOpenTodo} setEditSwitch={setEditSwitch} refetchTodos={refetch} selectedTodoId={selectedTodoId ? selectedTodoId.toString() : null} />
            )}
    </>
  )
}

export default TaskFeild