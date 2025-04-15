import { TiPencil } from "react-icons/ti";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

function TaskFeild() {

    const [checkBox, setCheckBox] = useState(false)

    const clickCheckBox = () => {
      setCheckBox((prev) => !prev)
    }
  return (
    <>
        <div  className='flex flex-col space-y-4 w-3/4 mt-5 divide-y divide-primary  '>

            <div className="flex justify-between items-center pb-4">
                <div className="flex items-center gap-5">
                    <span className={`w-5 h-5 flex items-center justify-center  rounded-[2px] border border-primary cursor-pointer ${checkBox ? "bg-primary" : "bg-white"}`} onClick={clickCheckBox} >
                    {checkBox ? <FaCheck color="white" /> : ""}
                    </span>
                    <span  className="text-xl font-bold">NOTE1</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 *:cursor-pointer">
                    <TiPencil className="hover:text-primary" />
                    <CiTrash className="hover:text-red-500" />
                </div>
            </div>

        </div>

            <div className="w-12 h-12 flex justify-center items-center fixed bottom-20 right-140 text-white bg-primary rounded-full hover:bg-acccent cursor-pointer">
                <FaPlus size={24}/>
            </div>
    </>
  )
}

export default TaskFeild