import React, { useEffect, useRef, useState } from 'react'
import RenderSteps from '../components/BecomeMentor/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { checkMentorApp } from '../services/operations/mentorApi'
import { MdCancel } from "react-icons/md";

const Mentor = () => {
  const {token} = useSelector(state=>state.auth)
  const [openmodal, setopenmodal] = useState(false)
  const modalref = useRef()
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
  useEffect(()=>{
    const clickHandler = (event)=>{
    if(!modalref.current.contains(event.target)){
      setopenmodal(false)
    }
      }
      document.addEventListener("mousedown",clickHandler)
     return ()=>{
      document.removeEventListener("mousedown",clickHandler)
     }
    })
  return (
    <div className={`relative flex items-center justify-center mt-10 ${loading ? "w-full h-[600px]" : ""} `}>
       {
        loading ? (<div className='spinner'></div>) : (
          <div className='w-10/12 flex flex-col items-center gap-y-3'> 
        <h1 className='lg:text-4xl text-2xl text-emerald-700 font-bold'><u>Apply as a Mentor</u></h1>
       {
        status ? (
          <div onClick={()=>setopenmodal(true)} className={` flex items-center justify-between mt-10 w-10/12 border-[1px] p-2 status gap-y-2`}>
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
      { status ? <div ref={modalref} className={`flex flex-col scale-0 bg-gradient-to-r from-sky-200 to-white gap-y-5 ease-in-out border-[1px] rounded-md absolute ${openmodal ? "transition-all duration-200 scale-100" : "scale-0"} w-[350px] md:w-[800px] lg:w-[1200px] top-[8px] p-10`}>
        <MdCancel onClick={()=>setopenmodal(false)} className='text-red-600 text-3xl absolute right-5 top-5'/>
         <div className='flex status-main gap-x-3'>
         <img src={status?.image} alt='profile'/>
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
       </div> : <div></div>}
    </div>
  )
}

export default Mentor