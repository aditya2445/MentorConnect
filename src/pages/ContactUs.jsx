import React, { useState } from 'react'
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { contactUs } from '../services/operations/authApi';
import Footer from '../components/Footer';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm()
  const [loading, setloading] = useState(false)

  const onsubmit = async (data)=>{
    setloading(true)
  const res = await contactUs(data);
  setloading(false)
  reset()
  }
  return (
    <div className='flex gap-24 items-center flex-col justify-center'>
        <div className='w-9/12 relative  flex items-center justify-end mt-20'>
        <div className='w-[1000px] lg:pl-[250px] lg:py-[50px] lg:pr-[50px] h-[600px] border-[1px] rounded-md'>
        <div className='contact w-[350px] text-white lg:visible invisible p-5  absolute justify-between left-0 top-[50px] rounded-md  h-[500px] border-[1px] flex flex-col'>
        <div className='flex flex-col gap-y-3'><h1 className='text-3xl font-bold'>Contact With Us</h1>
        <p><i>“We’re here to help you find the right mentor for your journey.”</i></p></div>
        <div className='flex flex-col'>
         <div className='flex items-center gap-2'>
          <IoIosCall className=''/>
          <div className='flex flex-col'>
           <p className='font-semibold'>Phone</p>
           <p><i className='text-[16px]'>+91-999-999-9999</i></p>
          </div>
         </div>
         <div className='flex items-center gap-2'>
          <FaLocationDot/>
          <div className='flex flex-col'>
           <p className='font-semibold'>Location</p>
           <p><i className='text-[16px]'>Ghatikia, Bhubaneswar</i></p>
          </div>
         </div><div className='flex items-center gap-2'>
          <MdEmail/>
          <div className='flex flex-col'>
           <p className='font-semibold'>Email</p>
           <p><i className='text-[16px]'>abcde@gmail.com</i></p>
          </div>
         </div>
        </div>
        </div>
        <div className='flex flex-col gap-y-5'>
       <div className='flex flex-col gap-y-3'> <h1 className='font-bold text-3xl'>Lets Talk</h1>
       <p className='text-xl'>Feel free to drop us a line below</p></div>
       <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-3'>
       <div className='lg:flex gap-3 justify-between  '>
  <div className='flex flex-col gap-y-1 w-[48%] '>
  <label className='text-[16px] ' htmlFor='firstName'>First Name</label>
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
  <div className='flex flex-col gap-y-1 w-[48%]'>
  <label className='text-[16px] ' htmlFor='lastName'>Last Name</label>
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
                <label className='text-[16px] ' htmlFor='email'>Email Address</label>
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


            <div className='flex flex-col gap-y-1'>
                <label className='text-[16px]' htmlFor='contact'>Contact No</label>
                <input
                type='contact'
                id='contact'
                placeholder='Enter Your contact Number'
                {...register("contact")}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
            </div>


            <div className='flex flex-col gap-y-1'>
        <label className='text-[16px] ' htmlFor="message">Message</label>
        <textarea
        name='message'
        {...register("message",{required:true})}
        className='border-[1px] rounded-md min-h-[80px] p-2'
        />
        {
          errors.message && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
       <div className='flex justify-end'><button className='bg-teal-500 p-2 px-5 rounded-md font-bold text-white  '>Submit</button></div>
       </form>
        </div>
        </div>
        </div>
        <Footer/>
    </div> 
  )
}

export default ContactUs