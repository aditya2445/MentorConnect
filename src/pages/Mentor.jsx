import React, { useEffect, useRef, useState } from 'react'
import RenderSteps from '../components/BecomeMentor/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { checkMentorApp } from '../services/operations/mentorApi'
import { MdCancel } from "react-icons/md";

const Mentor = () => {
  const {token} = useSelector(state=>state.auth)
  const dispatch= useDispatch()
  const [loading, setloading] = useState(false)
  const [status, setstatus] = useState(null)
  useEffect(()=>{
  const checkMentorStatus = async()=>{
  setloading(true)
   const response = await checkMentorApp(token);
   if(response)setstatus(response)
  setloading(false) 
  }
  checkMentorStatus()
  },[])

  const handleClick = ()=>{
    if(status){
      const container = document.querySelector(".container")
      const main = document.querySelector(".main")
      container.classList.add("active")
    }
  }
  const removeHandler = ()=>{
    if(status){
      const container = document.querySelector(".container")
      const main = document.querySelector(".main")
      container.classList.remove("active")
    }
  }
 
 
  return (
    <div className={`relative flex items-center justify-center mt-10 ${loading ? "w-full h-[600px]" : ""} `}>
       {
        loading ? (<div className='spinner'></div>) : (
          <div className='w-10/12 flex flex-col items-center gap-y-3'> 
        <h1 className='lg:text-4xl text-2xl text-emerald-700 font-bold'><u>Apply as a Mentor</u></h1>
       {
        status ? (
          <div onClick={handleClick}  className={`main flex items-center justify-between mt-10 w-10/12 border-[1px] p-2 status gap-y-2`}>
            <div className='flex gap-x-3 items-center status-photo'>
            <img src={status?.image} alt='profile' className='lg:w-[100px] lg:h-[100px] object-cover w-[200px] h-[200px]'/>
            <div className='flex flex-col gap-y-1 status-name'>
              <p>{status?.firstName} {status?.lastName}</p>
              <div className='flex  items-center gap-x-2'>
                <p>Company : {status?.company}</p>
              </div>
              <p>Category : {status?.category?.name}</p>
              </div>
            </div>
            <p className=''>Status : <span className={`${status?.state === "Pending" ? "text-yellow-400" : status?.state === "Accepted" ? "text-green-500" : "text-red-600"}`}>{status?.state}</span></p>
          </div>
        ) : (<RenderSteps/>)
       }
       </div>
        )
       }
      { status ?<div className='w-screen h-screen flex top-[-103px] absolute container'> <div onClick={removeHandler}  className=' overlay w-screen h-screen'></div><div className={`modal flex lg:flex-col top-[15%] left-[11%] absolute  bg-gradient-to-r from-sky-200 to-white gap-y-5   border-[1px] rounded-md w-[350px] md:w-[800px] lg:w-[1200px]  p-10`}>
        <MdCancel  onClick={removeHandler} className='text-red-600 text-3xl absolute right-5 top-5'/>
         <div className='flex status_main gap-x-3'>
         <img src={status?.image} alt='profile' className='lg:w-[400px] lg:h-[300px] object-cover h-[200px] w-[200px] '/>
         <div className='flex flex-col gap-y-2'>
          <p><span className='font-bold'>Name :</span> {status?.firstName} {status?.lastName}</p>
          <div className='flex gap-x-2'><p><span className='font-bold'>Company :</span> {status?.company}</p>
          <p><span className='font-bold'>Job Title :</span> {status?.jobTitle}</p></div>
          <p><span className='font-bold'>Address :</span> {status?.address}</p>
          <p><span className='font-bold'>Category :</span> {status?.category?.name}</p>
          <div className='flex gap-x-2 flex-wrap'>
            <span className='font-bold'>Skills :</span> 
             {
              JSON.parse(status?.skills)?.map((skill,index)=>{
                return <p className='border-[1px] bg-yellow-200 border-black rounded-md p-1' key={index}>{skill}</p>
              }) 
            }
         
          </div>
          <div className='flex gap-x-2'>
            <a href={status?.linkedInUrl} className='text-blue-600'>LinkedIn</a>
            <a href={status.githubUrl} className='text-blue-600'>Github</a>
          </div>
         </div>
        </div>
        <div className='flex flex-col gap-y-2'>
          <p className=''><span className='font-bold'>About : </span>{status?.about}</p>
          <p className=''><span className='font-bold'>Why do you want to become a mentor? : </span>{status?.whyDoYouWantToBecomeMentor}</p>
          <p className=''><span className='font-bold'>Achievements : </span>{status?.achievements}</p>
          <div><span className='font-bold'>State : </span><span className={`${status?.state === "Pending" ? "text-yellow-400" : status?.state === "Accepted" ? "text-green-500" : "text-red-600"} font-bold`}>{status?.state}</span></div>
        </div>
       </div></div> : <div></div>}
    </div>
  )
}

export default Mentor