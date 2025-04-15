import React, { useState } from 'react'

interface ITodoBoxProps {
    setOpenTodo: React.Dispatch<React.SetStateAction<boolean>>,
    getTextFromChild: (data:string) => void
    getIsBuildTaskChild: (data:boolean) => void
}

function TodoBox({setOpenTodo,getTextFromChild,getIsBuildTaskChild}:ITodoBoxProps) {

    const [inputvalue , setInputValue] = useState("")

    const applyValueHandle = () => {
        getTextFromChild(inputvalue)
        getIsBuildTaskChild(true)
        setInputValue("")
        setOpenTodo(false)
    }

  return (
    <div className='absolute top-48 left-0 right-0 w-[30%] mx-auto bg-white shadow-2xl p-3 border border-gray-300 rounded-md'>
        <div className='flex flex-col justify-center items-center '>
        <h1 className='font-semibold text-center mb-5 text-xl' >New Note</h1>
        <input type="text" className='w-[95%] py-1 pl-3 rounded-md border border-primary outline-none'
         placeholder='Input your note ...'
         value={inputvalue}
         onChange={(e) => setInputValue(e.target.value)}
         />
        </div>
        <div className='flex justify-between pt-20 *:px-5 *:py-1 *:cursor-pointer'>
            <button className='border border-primary text-primary rounded-md font-semibold' onClick={() => setOpenTodo(false)}>Cancel</button>
            <button className='bg-primary text-white rounded-md font-semibold active:bg-acccent' onClick={applyValueHandle}>Apply</button>
        </div>
    </div>
  )
}

export default TodoBox