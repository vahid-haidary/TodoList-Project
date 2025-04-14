import React from 'react'
import { FaUser,FaLock  } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

function Login() {
  return (
    <div className='w-full grid grid-cols-2 h-screen' >
        <div className='w-full bg-black flex flex-col justify-center'>
          <h1 className='text-white text-7xl font-semibold text-center'>Vahid-Todo</h1>
        </div>
          <div className='flex flex-col justify-center items-center h-screen' >
            <form className='w-1/2 flex flex-col gap-3.5 *:bg-gray-100 *:text-gray-500 *:py-3 *:pl-3 *:rounded-md '>
            <div className='mb-2 !bg-white !text-black'>
              <h2 className='!font-bold !text-2xl' >Hello!</h2>
              <span>Sign Up to Get Started</span>
            </div>

            <div className='flex items-center'>
                <FaUser className='mr-3' />
                <input type="text" placeholder='Full Name'/>
            </div>
            <div className='flex items-center'>
                <FiMail className='mr-3' />
                <input type="text" placeholder='Email Address'/>
            </div>
            <div className='flex items-center'>
                <FaLock className='mr-3' />
                <input type="text" placeholder='Password'/>
            </div>
                <button type='submit' className='!bg-black !text-white' >Register</button>
            </form>
          </div>
    </div>
  )
}

export default Login