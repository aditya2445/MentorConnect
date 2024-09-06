import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { AcceptRequest, createTimeSlots, getSessionRequests, getTimeSlots, RejectRequest } from '../../../services/operations/sessionApi'
import Time from './Time'

const TimeSlots = () => {
  const [timeslots, settimeslots] = useState([])
  const {token} = useSelector(state=>state.auth)
  const {user} = useSelector(state=>state.profile)
  const {register,handleSubmit,reset,formState:{errors}} =  useForm()
  const [loading, setloading] = useState(false)
  const [requests, setrequests] = useState([])

  useEffect(()=>{
  fetchRequests()
  },[])
  const fetchRequests = async()=>{
    setloading(true)
    const res = await getSessionRequests(token);
    if(res)setrequests(res)
      console.log(res)
    setloading(false)
  }

  useEffect(()=>{
    fetchTimeSlots()
     },[])

     const fetchTimeSlots = async()=>{
      const response = await getTimeSlots(user?._id)
      settimeslots(response?.timeSlots)
     }
  
  const onsubmit = async(data)=>{
  const date1 = new Date(data.start)
  const date2 = new Date(data.end)

  if(date1.getFullYear()>date2.getFullYear() || new Date().getFullYear()>date1.getFullYear()){
    toast.error("Invalid Time Slot")
      return;
  }
  if(date1.getMonth()>date2.getMonth() || new Date().getMonth()>date1.getMonth()){
    toast.error("Invalid Time Slot")
      return;
  }
  if(date1.getDay()>date2.getDay() || new Date().getDay()>date1.getDay()){
    toast.error("Invalid Time Slot")
      return;
  }
  if(date1.getTime()>date2.getTime() || new Date().getTime()>date1.getTime()){
    toast.error("Invalid Time Slot")
      return;
  }
  const differenceInMilliseconds = date2 - date1;
const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

if (differenceInHours > 1) {
    toast.error("Time slot size can only be upto 24 hrs")
    return
} 
    const res = await createTimeSlots({date1,date2},token)
    fetchTimeSlots()
    reset()
  }
  const acceptHandler = async(sessionId)=>{
    setloading(true);
    const res = await AcceptRequest(token,sessionId);
    fetchRequests()
    setloading(false)
  }
  const rejectHandler = async(sessionId)=>{
    setloading(true);
    const res = await RejectRequest(token,sessionId);
    fetchRequests()
    setloading(false)
  }
  return (
    <div className='mt-14 w-full  '>
      <div className='flex justify-between  items-center w-full'>
        <div className='flex flex-col gap-y-5 w-[30%]'>
    <div>  <h1 className='text-3xl font-bold '><u>Add Time Slots</u></h1></div>
      <form onSubmit={handleSubmit(onsubmit)} className=' flex flex-col gap-3'>
      <div className='flex flex-col gap-y-1'>
                <label htmlFor='start'>Start Date</label>
                <input
                type='datetime-local'
                id='start'
                placeholder='Enter Your Date'
                {...register("start",{required:true})}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
                {
                    errors.start && (
                        <span> start Date can't be Empty </span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-1'>
                <label htmlFor='end'>End Date</label>
                <input
                type='datetime-local'
                id='end'
                placeholder='Enter Your Date'
                {...register("end",{required:true})}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
                {
                    errors.end && (
                        <span> end Date can't be Empty </span>
                    )
                }
            </div>
          <div className='flex justify-end'><button className='bg-teal-500 font-bold text-white rounded-md p-2 px-3'>Add</button></div>
      </form>
      </div>
      <div className='flex flex-col gap-y-3 w-[50%] shadow-lg rounded-lg p-5 h-[300px] items-center overflow-scroll'>
       <h1 className='font-bold text-xl '><i>Your Time Slots</i></h1>
       <div className='flex flex-col gap-y-2'>
        {
          timeslots && timeslots.length>0 ? <div>
            {
              timeslots.map((time)=>{
                return <Time key={time._id} time={time}/>
              })
            }
          </div> : <div className=''>No Timeslots Found</div>
        }
       </div> 
      </div>
      </div>
      <div className='my-10'><h1 className='text-3xl font-bold'><u>Session Requests</u></h1></div>
      {loading ? (<div className='h-[200px] flex items-center justify-center'><div className='spinner  '></div></div>): <table className='w-full'>
      <thead>
    <tr className="bg-gray-100">
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Title</th>
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Description</th>
      <th className="px-4 py-2 text-left text-gray-600 font-bold">{user?.accountType === "Mentor" ? "Mentee" : "Mentor"}</th>
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Time</th>
      <th className="px-4 py-2 text-center text-gray-600 font-bold">Action</th>
    </tr>
  </thead>
  {requests.length>0 ? <tbody>
      {
        requests?.map((item)=>{
          const start = new Date(item.startDate)
          const end = new Date(item.endDate)
          return <tr key={item._id} className='border-b hover:bg-gray-50 transition duration-300 ease-in-out '>
           <td className="px-4 py-2">{item.title}</td>
           <td className="px-4 py-2">{item.description}</td>
           <td className="px-4 py-2">{user?.accountType === "Mentee" ? item.mentor.firstName+" "+item.mentor.lastName : item.mentee.firstName+" "+item.mentee.lastName }</td>
           <td className="px-4 py-2">{start.toLocaleDateString()+" "+start.toLocaleTimeString() + "-" + end.toLocaleTimeString()}</td>
           <td className="px-4 py-2 text-center text-white gap-2 space-x-2"><button onClick={()=>acceptHandler(item._id)} className='bg-green-500 px-2 rounded-md py-1'>Accept</button><button onClick={()=>rejectHandler(item._id)} className='bg-red-500 py-1 rounded-md px-2'>Reject</button></td>
          </tr>
        })
      }
      </tbody> : <tbody  className=''><tr className='h-[150px]'><td colSpan="5" className='px-4 py-2 text-center'>No Requests Found</td></tr></tbody>}
      </table>}
    </div>
  )
}

export default TimeSlots