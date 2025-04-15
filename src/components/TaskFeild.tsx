import { TiPencil } from "react-icons/ti";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import TodoBox from "./TodoBox";


interface ITask {
    id: number;
    title: string;
    isComplete: boolean
}


function TaskFeild() {

    const [checkBox, setCheckBox] = useState(false)
    const [openTodo , setOpenTodo] = useState(false)
    const [message , setMessage] = useState("")
    const [isBuildTask, setIsBuildTask] = useState(false)
    const [task , setTask] = useState<ITask[]>([])


    const addTask = (title:string) => {
      const newTask = {
        id: Date.now(),
        title,
        isComplete: false
      }

      setTask((prevTask) => [...prevTask,newTask])
      setIsBuildTask(true)
    }


    const getIsBuildTaskChild = (data:boolean) => {
      setIsBuildTask(data)
    }

    const clickCheckBox = () => {
      setCheckBox((prev) => !prev)
    }

    const openTodoHandle = () => {
        setOpenTodo((prev) => !prev);
    }

  return (
    <>
        <div  className='flex flex-col space-y-4 w-3/4 mt-5 divide-y divide-primary  '>

        {isBuildTask && (
            task.map((task) => 
              (
                <div key={task.id} className="flex justify-between items-center pb-4">
                <div className="flex items-center gap-5">
                    <span className={`w-5 h-5 flex items-center justify-center  rounded-[2px] border border-primary cursor-pointer ${checkBox ? "bg-primary" : "bg-white"}`} onClick={clickCheckBox} >
                    {checkBox ? <FaCheck color="white" /> : ""}
                    </span>
                    <span  className={`text-xl font-bold ${checkBox ? "line-through text-gray-400" : ""}`}>{task.title}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 *:cursor-pointer">
                    <TiPencil className="hover:text-primary" />
                    <CiTrash className="hover:text-red-500" />
                </div>
            </div>
              )
            )
        )}
        </div>

            <div onClick={openTodoHandle} className="w-12 h-12 flex justify-center items-center fixed bottom-20 right-140 text-white bg-primary rounded-full hover:bg-acccent cursor-pointer">
                <FaPlus size={24}/>
            </div>
            {openTodo && (
                <TodoBox setOpenTodo={setOpenTodo} getTextFromChild={addTask} getIsBuildTaskChild={getIsBuildTaskChild}/>
            )}
    </>
  )
}

export default TaskFeild