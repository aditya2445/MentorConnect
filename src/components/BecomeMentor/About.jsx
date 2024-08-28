import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Upload from '../../utils/upload'
import {  setMentor, setStep } from '../../slice/mentorSlice'


const About = () => {
    const {mentor} = useSelector(state=>state.mentor)
    const dispatch = useDispatch()
    const {register,
        setValue,handleSubmit,
        formState:{errors}
    } = useForm()
    
    useEffect(()=>{
        if(mentor){
        setValue("firstName", mentor.firstName)
        setValue("lastName", mentor.lastName)
        setValue("jobTitle", mentor.jobTitle)
        setValue("company", mentor.company)
        setValue("address", mentor.address)
        setValue("image", mentor.image) 
       }
    
    },[])
    
    const onSubmit = (data)=>{
    dispatch(setMentor(data))
     dispatch(setStep(2))
    }

  return (
    <div className='flex flex-col w-full '>
       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 w-full'>
        <Upload
        register={register}
        setValue={setValue}
        name={"image"}
        label="Profile Picture"
        errors={errors}
        view={mentor?.image}
        />
        <div className='md:flex gap-3 w-full '>
  <div className='flex flex-col gap-y-1 md:w-[50%] '>
  <label htmlFor='firstName'>First Name</label>
                <input
                type='text'
                id='firstName'
                {...register("firstName",{required:true})}
                className='border-[1px] h-[40px] rounded-md   px-3'
                />
                {
                    errors.firstName && (
                        <span> firstName can't be Empty </span>
                    )
                }
  </div>
  <div className='flex flex-col gap-y-1 md:w-[50%]'>
  <label htmlFor='lastName'>Last Name</label>
                <input
                type='text'
                id='lastName'
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

 <div className='lg:flex gap-3 '>
  <div className='flex flex-col gap-y-1 md:w-[50%] '>
  <label htmlFor='jobTitle'>Job Title (optional)</label>
                <input
                type='text'
                id='jobTitle'
                {...register("jobTitle")}
                className='border-[1px] h-[40px] rounded-md  px-3'
                />
  </div>
  <div className='flex flex-col gap-y-1 md:w-[50%]'>
  <label htmlFor='company'>company (optional)</label>
                <input
                type='text'
                id='company'
                {...register("company")}
                className='border-[1px] h-[40px]  rounded-md px-3'
                />
  </div>
 </div>
 <div className='flex flex-col gap-y-1'>
 <label htmlFor='Address'>Address</label>
                <input
                type='text'
                id='address'
                {...register("address",{required:true})}
                className='border-[1px] h-[40px]  rounded-md px-3'
                /> {
                    errors.address && (
                        <span>Address is Required</span>
                    )
                }
 </div>
 <div className='flex  justify-end'><button className='bg-emerald-700 rounded-md p-2 text-white'>Next step</button></div>
       </form>
    </div>
  )
}

export default About