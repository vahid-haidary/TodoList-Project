import React from 'react'

function Login() {
  return (
    <div className='w-full grid grid-cols-2 h-screen' >
        <div className='w-full bg-black flex flex-col justify-center'>
          <h1 className='text-white text-7xl font-semibold text-center'>Vahid-Todo</h1>
        </div>
        <div>
          <div className='flex flex-col justify-center items-center h-screen' >
            <div className='mb-7 '>
              <h2 className='font-bold text-2xl' >Hello!</h2>
              <span>Sign Up to Get Started</span>
            </div>
            <form className='w-1/2 flex flex-col gap-3.5 *:bg-gray-100 *:text-gray-500 *:py-3 *:pl-3 *:rounded-md '>
                <input type="text" placeholder='Full Name'/>
                <input type="text" placeholder='Email Address'/>
                <input type="text" placeholder='Password'/>
                <button type='submit' className='!bg-black !text-white' >Register</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login