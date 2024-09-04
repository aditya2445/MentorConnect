import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/operations/authApi';
import { useLocation } from 'react-router-dom';
import { setToken } from '../../slice/authSlice';
import { setUser } from '../../slice/profileSlice';
import toast from 'react-hot-toast';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const LogInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = useQuery();

  useEffect(() => { 
if(query.get('err')){
   const container = document.getElementById('container')
   container.style.opacity='1' 
}
  else { const token = query.get('token');
    const user = query.get('user')
    console.log(user,token)
    if (token && user) {
        const toastId = toast.loading("Loading...")
        dispatch(setToken(token))
        dispatch(setUser(JSON.parse(user)))
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', user);
      toast.dismiss(toastId)
      navigate("/")}
    }
  }, [query]);
    
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm()

    const onSubmit = (data)=>{
    dispatch(login(data.email,data.password,navigate))
    reset();
    }

    const loginHandler = async()=>{
        window.location.href = "http://localhost:3000/api/v1/auth/google/login?action=login"
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
            <button onClick={loginHandler} className='border-[1px] h-[40px] rounded-md w-full px-3 flex items-center justify-center gap-2 font-semibold' type='button'><FcGoogle className='text-xl'/> Sign in with Google</button> 
            <div id='container' className={` opacity-0 bg-gradient-to-r from-[#db8d8d] to-[#d3939333]`}>Account doesn't exist</div>
        </form>
        <div className='text-teal-400'><u>Forgot Password?</u></div>
        <div>Don't have an account? <Link to={'/signup'} className='text-teal-400'><u>Sign up</u></Link></div>
    </div>
  )
}

export default LogInForm