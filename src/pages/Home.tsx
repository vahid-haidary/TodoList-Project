import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import TaskFeild from '../components/TaskFeild'

function Home() {

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [todoFilter , setTodoFilter] = useState<string>('All')

  const todoFilterHandle = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setTodoFilter(e.target.value);
  }


  return (
    <>
    <section className='w-full h-screen ' >
        <div className='w-1/2 max-xs:w-3/4 mx-auto mt-10 pb-7' >
            <h1 className='text-center text-2xl font-bold'>TODO LIST</h1>
            <div className='flex justify-between mt-7 max-xs:flex-col max-xs:items-center max-xs:gap-6'>
              <div className='flex items-center justify-between w-3/4 border px-4 border-primary outline-none rounded-md *:focus-visible:outline-none max-xs:h-10'>
                <input className='w-full'  type="search" onChange={(e) => setSearchTerm(e.target.value)}  placeholder='Search note...' />
                <FiSearch size={24} className='cursor-pointer text-primary'/>
              </div>
              <select value={todoFilter} onChange={todoFilterHandle} className='bg-primary w-28 px-2 py-2 text-white rounded-md focus-visible: *:bg-white *:text-primary *:hover:text-acccent ' name="completing" id="completing">
                <option value="ALL">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <TaskFeild  searchTerm={searchTerm} todoFilter={todoFilter} />
        </div>
    </section>

    </>
  )
}

export default Home