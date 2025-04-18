import React, { useEffect } from 'react'
import axios from "axios"
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'

interface ITodoBoxProps {
    setOpenTodo: React.Dispatch<React.SetStateAction<boolean>>,
    refetchTodos: () => void,
    setEditSwitch: React.Dispatch<React.SetStateAction<boolean>>,
    selectedTodoId: string | null,
    
}

interface ITodos {
    id:string;
    message: string | null;
    isComplete: boolean;
}


const postTodos = async(newTodo:ITodos) => {
  const response = await axios.post("https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items",newTodo) 
  console.log(response);
  return response

}

const putTodos = async (updatedTodo:ITodos) => {
  const response = await axios.put(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${updatedTodo.id}`,updatedTodo)
  return response.data
}

const fetchTodo = async(selectedTodoId:string) => {
  const response = await axios.get<ITodos>(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${selectedTodoId}`)
  return response
}


function TodoBox({setOpenTodo,refetchTodos,setEditSwitch,selectedTodoId}:ITodoBoxProps) {
  
  const schema = zod.object({
    boxInputValue: zod.string()
  })

  const {register,handleSubmit,reset,setValue,setFocus} = useForm({
    resolver: zodResolver(schema)
  })

  type FormData = zod.infer<typeof schema>
   
    const {mutate} = useMutation({
        mutationFn: postTodos,
        mutationKey: ['todo'],
        onSuccess:() => {
            refetchTodos()
            setOpenTodo(false)
            reset()
        }
        
    })

    const {mutate:putMutate} = useMutation({
      mutationFn: putTodos,
      onSuccess: () => {
        refetchTodos()
        setOpenTodo(false)
        setEditSwitch(false)
        reset()
      }
    })
    const {mutate:getTodo} = useMutation({
      mutationFn: fetchTodo,
      onSuccess: (response) => {
        console.log(response);
        setValue('boxInputValue',response.data.message || "")
      }
    })

    const cancelHandle = () => {
        setOpenTodo(false)
        setEditSwitch(false)
    }

    const submitHandle = (data:FormData) => {
      console.log(data);
      if(data.boxInputValue === ""){
        setFocus('boxInputValue')
        return
      }
      const newTodo:ITodos = {
        id: selectedTodoId ? selectedTodoId.toString() : null,
        message: data.boxInputValue,
        isComplete: false
      }
      if(selectedTodoId){
        putMutate(newTodo)
      }else{
        mutate(newTodo)
      }

    }

    useEffect(() => {
      setFocus('boxInputValue')

      if(selectedTodoId){

        getTodo(selectedTodoId)
      }
    },[selectedTodoId])

  return (
    <form onSubmit={handleSubmit(submitHandle)} className='absolute top-48 left-0 right-0 w-[30%] max-xs:w-[80%] mx-auto bg-white shadow-2xl p-3 border border-gray-300 rounded-md'>
        <div className='flex flex-col justify-center items-center '>
        <h1 className='font-semibold text-center mb-5 text-xl' >New Note</h1>
        <input type="text" className='w-[95%] py-1 pl-3 rounded-md border border-primary outline-none'
         placeholder='Input your note ...'
         {...register("boxInputValue")}
         />
        </div>
        <div className='flex justify-between pt-20 *:px-5 *:py-1 *:cursor-pointer'>
            <button className='border border-primary text-primary rounded-md font-semibold' type='button' onClick={cancelHandle}>Cancel</button>
            <button className='bg-primary text-white rounded-md font-semibold active:bg-acccent' type='submit'>Apply</button>
        </div>
    </form>
  )
}

export default TodoBox