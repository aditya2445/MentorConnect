import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LogInForm = () => {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

    const onSubmit = (data)=>{
    const formData = new FormData()
    formData.append("email",data.email)
    formData.append("password",data.password)
    console.log(data)
    }
    
    const [showpass, setshowpass] = useState(false)

  return (
    <div className='flex flex-col gap-y-3 lg:w-[40%]  p-5 flex-wrap '>
        <div className='text-3xl font-bold mb-7'>Log In</div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3'>
            <div className='flex flex-col gap-y-1'>
                <label htmlFor='email'>Email Address</label>
                <input
                type='email'
                id='email'
                placeholder='Enter Your Email'
                {...register("email",{required:true})}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
                {
                    errors.email && (
                        <span> Email Address can't be Empty </span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-1 relative'>
                <label htmlFor='password'>Password</label>
                <input
                type={showpass ? 'text' : 'password'}
                id='password'
                placeholder='Enter Your Password'
                {...register("password",{required:true})}
                 className='border-[1px] h-[40px] rounded-md w-full pl-3 pr-10'
                />
                <span onClick={()=>setshowpass(!showpass)} className='absolute right-3 bottom-3'>
                    {
                        !showpass ? (<FaEye/>) : (<FaEyeSlash/>)
                    }
                </span>
                {
                    errors.password && (
                        <span> Password can't be Empty </span>
                    )
                }
            </div>
     
            <button className='border-[1px] bg-teal-700 text-white h-[40px] mt-5 rounded-md w-full px-3'>Log In</button>
            <div className='w-full flex items-center justify-center gap-2'>
            <div className=' border-[1px] w-[40%]'></div>
            OR
            <div className=' border-[1px] w-[40%]'></div>
            </div>
            <button className='border-[1px] h-[40px] rounded-md w-full px-3 flex items-center justify-center gap-2 font-semibold' type='button'><FcGoogle className='text-xl'/> Sign in with Google</button> 
         
        </form>
        <div className='text-teal-400'><u>Forgot Password?</u></div>
        <div>Don't have an account? <Link to={'/signup'} className='text-teal-400'><u>Sign up</u></Link></div>
    </div>
  )
}

export default LogInForm