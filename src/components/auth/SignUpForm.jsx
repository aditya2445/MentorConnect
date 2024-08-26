import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../slice/authSlice';
import { sendOtp } from '../../services/operations/authApi';
import toast from 'react-hot-toast';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
  
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState:{errors},
    reset
} = useForm()
const query = useQuery();

useEffect(()=>{
    if(query.get('err')){
        const container = document.getElementById('container')
        container.style.opacity='1' 
    }
},[query])

const [showpass, setshowpass] = useState(false)
const dispatch = useDispatch()
const navigate = useNavigate()

const onSubmit = (data)=>{

  dispatch(setSignupData({...data,accountType:"Mentee"}))
  dispatch(sendOtp(data.email,navigate))
  reset()
}

const signupHandler = async()=>{
    window.location.href = "http://localhost:3000/api/v1/auth/google/signup?action=signup"
}
  return (
    <div className='flex flex-col gap-y-3 lg:w-[40%] flex-wrap p-5'>
       <div className='text-3xl font-bold mb-7'>Sign Up</div>
  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3 '>
 <div className='lg:flex gap-3 '>
  <div className='flex flex-col gap-y-1 '>
  <label htmlFor='firstName'>First Name</label>
                <input
                type='text'
                id='firstName'
                placeholder='Enter Your firstName'
                {...register("firstName",{required:true})}
                className='border-[1px] h-[40px] rounded-md  px-3'
                />
                {
                    errors.firstName && (
                        <span> firstName can't be Empty </span>
                    )
                }
  </div>
  <div className='flex flex-col gap-y-1'>
  <label htmlFor='lastName'>Last Name</label>
                <input
                type='text'
                id='lastName'
                placeholder='Enter Your lastName'
                {...register("lastName",{required:true})}
                className='border-[1px] h-[40px]  rounded-md px-3'
                />
                {
                    errors.lastName && (
                        <span> lastName can't be Empty </span>
                    )
                }
  </div>
 </div>
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

          
            <button className='border-[1px] bg-teal-700 text-white h-[40px] rounded-md mt-5 w-full px-3'>Sign Up</button>
            <div className='w-full flex items-center justify-center gap-2'>
            <div className=' border-[1px] w-[40%]'></div>
            OR
            <div className=' border-[1px] w-[40%]'></div>
            </div>
            <button onClick={signupHandler} className='border-[1px] h-[40px] rounded-md w-full px-3 flex items-center justify-center gap-2 font-semibold' type='button'><FcGoogle className='text-xl'/> Sign up with Google</button>  
            <div id='container' className={` opacity-0 bg-gradient-to-r from-[#db8d8d] to-[#d3939333]`}>Account already exist</div> 
  </form>
  <div>Already have an account? <Link to={"/login"} className='text-teal-400'><u>Log in</u></Link></div>
  <div className='text-teal-400'><u>Apply to be a Mentor?</u></div>
    </div>
  )
}

export default SignUpForm