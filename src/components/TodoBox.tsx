import React, { useState } from 'react'
import axios from "axios"
import { useMutation } from '@tanstack/react-query';

interface ITodoBoxProps {
    setOpenTodo: React.Dispatch<React.SetStateAction<boolean>>,
    refetchTodos: () => void,
    setEditSwitch: React.Dispatch<React.SetStateAction<boolean>>,
    
}

interface ITodos {
    id:string;
    message: string | null;
    isComplete: boolean
}

const postTodos = async(newTodo:ITodos) => {
  const response = await axios.post("https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items",newTodo) 
  console.log(response);
  return response

}

function TodoBox({setOpenTodo,refetchTodos,setEditSwitch}:ITodoBoxProps) {

    const [inputvalue , setInputValue] = useState({
        id: "",
        message: "",
        isComplete : false
    })
     


    const {isPending,mutate,data} = useMutation({
        mutationFn: postTodos,
        mutationKey: ['todo'],
        onSuccess:() => {
            refetchTodos()
            setOpenTodo(false)
        }
        
    })

    const cancelHandle = () => {
        setOpenTodo(false)
        setEditSwitch(false)
    }

    const submitHandle = (e:React.FormEvent) => {
      e.preventDefault()
      if(inputvalue.message == ""){
        alert("Please Insert Message")
        return
      }
      mutate(inputvalue)

    }

  return (
    <form onSubmit={submitHandle} className='absolute top-48 left-0 right-0 w-[30%] mx-auto bg-white shadow-2xl p-3 border border-gray-300 rounded-md'>
        <div className='flex flex-col justify-center items-center '>
        <h1 className='font-semibold text-center mb-5 text-xl' >New Note</h1>
        <input type="text" className='w-[95%] py-1 pl-3 rounded-md border border-primary outline-none'
         placeholder='Input your note ...'
         value={inputvalue.message}
         onChange={(e) => setInputValue((prev) => ({...prev, message:e.target.value}))}
         />
        </div>
        <div className='flex justify-between pt-20 *:px-5 *:py-1 *:cursor-pointer'>
            <button className='border border-primary text-primary rounded-md font-semibold' type='button' onClick={cancelHandle}>Cancel</button>
            <button className='bg-primary text-white rounded-md font-semibold active:bg-acccent' onClick={submitHandle}>Apply</button>
        </div>
    </form>
  )
}

export default TodoBox