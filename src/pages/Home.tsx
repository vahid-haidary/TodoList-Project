import React from 'react'
import { FiSearch } from 'react-icons/fi'
import TaskFeild from '../components/TaskFeild'

function Home() {
  return (
    <>
    <section className='w-full h-screen' >
        <div className='w-1/2 mx-auto mt-10' >
            <h1 className='text-center text-2xl font-bold'>TODO LIST</h1>
            <div className='flex justify-between mt-5'>
              <div className='flex items-center justify-between w-3/4 border px-4 border-primary outline-none rounded-md *:focus-visible:outline-none'>
                <input className='w-full'  type="search"  placeholder='Search note...' />
                <FiSearch size={24} className='cursor-pointer text-primary'/>
              </div>
              <select className='bg-primary w-28 px-2 py-2 text-white rounded-md focus-visible: *:bg-white *:text-primary *:hover:text-acccent ' name="completing" id="completing">
                <option value="ALL">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <TaskFeild/>
        </div>
    </section>

    </>
  )
}

export default Home