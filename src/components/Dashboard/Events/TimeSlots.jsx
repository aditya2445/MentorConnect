import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { createTimeSlots, getTimeSlots } from '../../../services/operations/sessionApi'
import Time from './Time'

const TimeSlots = () => {
  const [timeslots, settimeslots] = useState([])
  const {token} = useSelector(state=>state.auth)
  const {user} = useSelector(state=>state.profile)
  const {register,handleSubmit,reset,formState:{errors}} =  useForm()
  

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
  
  return (
    <div className='mt-14 w-full '>
      <div className='flex justify-evenly items-center w-full'>
        <div className='flex flex-col gap-y-5'>
    <div>  <h1 className='text-3xl font-bold'>Add Time Slots</h1>
    <p className='text-lg'><i>for mentees to connect</i></p></div>
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
          <div className='flex justify-end'><button className='bg-teal-500 font-bold text-white rounded-md p-2'>Add</button></div>
      </form>
      </div>
      <div className='flex flex-col gap-y-3'>
       <h1>Your Time Slots</h1>
       <div className='flex flex-col gap-y-2'>
        {
          timeslots ? <div>
            {
              timeslots.map((time)=>{
                return <Time key={time._id} time={time}/>
              })
            }
          </div> : <div>No Time Slots Found</div>
        }
       </div>
      </div>
      </div>
    </div>
  )
}

export default TimeSlots