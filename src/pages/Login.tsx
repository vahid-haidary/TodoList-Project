import { FaUser,FaLock  } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import {SubmitHandler, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod"
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from "react-router-dom";


interface IForm {
  name: string
  email: string
  password: string
}

function Login() {

  const navigate = useNavigate()

  const schema = zod.object({
    name: zod.string().max(15,'Maximum Charecter 15'),
    email: zod.string().min(1,"requierd Email").email(),
    password: zod.string().max(10,"Max Least 10 charecter").min(6,"Min Least 6 charecter")
  })

  const {register, reset,handleSubmit,formState:{errors,isSubmitting}} = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit"
  })


const onFormSubmit:SubmitHandler<IForm> = async(data) => {
  await new Promise<void>((resolve) => setTimeout(resolve,2000))

  const uuidData = {
    ...data,
    tokenId: uuidv4()
  }
  localStorage.setItem('token',JSON.stringify(uuidData))
  reset()
  navigate("/home")
}


  return (
    <div className='w-full grid grid-cols-2 max-xs:grid-cols-1 max-xs:grid-rows-2 max-xs:gap-14 h-screen'  >
        <div className='w-full bg-primary flex flex-col justify-center'>
          <h1 className='text-white text-7xl max-xs:text-5xl font-semibold text-center '>Vahid-Todo</h1>
        </div>
          <div className='flex flex-col justify-center max-xs:justify-start items-center h-screen' >

            <form onSubmit={handleSubmit(onFormSubmit)} className='w-1/2 max-xs:w-3/4 flex flex-col gap-3.5 *:bg-gray-100 *:text-gray-500 *:py-3 *:pl-3 *:rounded-md *:focus-visible:outline-none '>
            <div className='mb-2 !bg-white !text-black'>
              <h2 className='!font-bold !text-2xl ' >Hello!</h2>
              <span>Sign Up to Get Started</span>
            </div>

            <div className='flex items-center *:focus-visible:outline-none'>
                <FaUser className='mr-3' />
                <input type="text" placeholder='Full Name' {...register('name')}/>
            </div>
                {errors.name && (
                  <div className="!text-red-600 !bg-white !py-0">{errors.name.message}</div>
                )}
            <div className='flex items-center *:focus-visible:outline-none'>
                <FiMail className='mr-3' />
                <input type="text" placeholder='Email Address' {...register('email')}/>
            </div>
                {errors.email && (
                  <div className="!text-red-600 !bg-white !py-0">{errors.email.message}</div>
                )}
            <div className='flex items-center *:focus-visible:outline-none'>
                <FaLock className='mr-3' />
                <input type="password" placeholder='Password' {...register('password')}/>
            </div>
                {errors.password && (
                  <div className="!text-red-600 !bg-white !py-0 ">{errors.password.message}</div>
                )}
                <button type='submit' className='!bg-primary !text-white'>{isSubmitting ? <span className="loading loading-spinner loading-xl text-white"></span>:"Register"}</button>

            </form>
          </div>
    </div>
  )
}

export default Login