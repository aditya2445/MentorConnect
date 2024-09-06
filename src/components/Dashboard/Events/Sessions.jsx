import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer,Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Day from './Day';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { fetchMentors } from '../../../services/operations/mentorApi';
import { bookSession, getAllSessions, getTimeSlots } from '../../../services/operations/sessionApi';
import toast from 'react-hot-toast';

const localizer = momentLocalizer(moment)

const Sessions = () => {
  const [events, setevents] = useState([])
  const {token} = useSelector(state=>state.auth)
  const [loading, setloading] = useState(false)
  const [mentors, setmentors] = useState([])
  const [timeSlots, settimeSlots] = useState([])
  const {handleSubmit,register,reset,formState:{errors},setValue} = useForm()
  useEffect(()=>{
  const fetchMent = async()=>{
    setloading(true)
    const res = await fetchMentors(token)
    if(res)setmentors(res)
    setloading(false)
  }
  fetchMent()
  },[])

  useEffect(()=>{
  fetchEvents()
  },[])
  
  const fetchEvents = async()=>{
    setloading(true);
    const res = await getAllSessions(token);
    if(res){
     const calendar = res.events?.map((item)=>{
      return {
        title:item.title,
        start:new Date(item.startDate),
        end:new Date(item.endDate),
        status:item.status
      }
     })
     setevents(calendar)
    }
      setloading(false)
  }


  const fetchSlots = async(data)=>{
    setloading(true);
    
    const res = await getTimeSlots(data)
    if(res)settimeSlots(res.timeSlots)
    
    setloading(false)
  }


  const onsubmit = async (data)=>{
    const res = await bookSession(data,token) 
    fetchEvents()
 reset()
  }

  const dateHandler = (event)=>{
  const slot = JSON.parse(event.target.value)
  const start = new Date (slot.start);
  const end = new Date(slot.end);
  const parseDateToInputFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  setValue("startDate",parseDateToInputFormat(start))
  setValue("endDate",parseDateToInputFormat(end))
  }

  return (
    <div className='flex-col flex w-full items-center justify-center mt-10'>
      <div className='w-10/12 flex items-center justify-between '>
        <div className='w-[50%]'><form onSubmit={handleSubmit(onsubmit)} className='w-full flex  flex-col gap-y-3'>
        <div className='flex flex-col gap-y-1'>
                <label htmlFor='title'>Title</label>
                <input
                type='title'
                id='title'
                placeholder='Enter  title'
                {...register("title",{required:true})}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
                {
                    errors.title && (
                        <span> Title is Required</span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-1'>
        <label htmlFor="description">Description</label>
        <textarea
        name='description'
        {...register("description",{required:true})}
        className='border-[1px] rounded-md min-h-[60px] p-2'
        />
        {
          errors.description && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
      <div className='flex flex-col gap-y-1'>
        <label htmlFor="mentorId">Select the mentor you want to book</label>
        <select 
        name='mentorId'
        defaultValue=""
        {...register("mentorId",{required:true})}
        onChange={(e) => {
          const selectedMentorId = e.target.value;
          if (selectedMentorId) {
            fetchSlots(selectedMentorId);
          }
        }}
        className='border-[1px] h-[40px] rounded-md  px-3'
        >
        <option className='' value="" disabled >Choose a mentor</option>
       {
            mentors?.mentors?.map((mentor,index)=>{
            return <option key={index} value={mentor._id}>{mentor?.firstName+" "+mentor?.lastName}</option>
        })
       }
        </select>
        {
          errors.mentorId && (
          <span>Please select an mentor</span>
          )
        }
      </div>

      <div className='flex flex-col gap-y-1'>
        <label htmlFor="timeslots"></label>
        <select 
        name='timeslots'
        defaultValue=""
        {...register("timeslots")}
        className='border-[1px] h-[40px] rounded-md  px-3'
        onChange={dateHandler}
        >
        <option className='' value="" disabled >Choose a Time Slot</option>
       {
            timeSlots?.map((slot,index)=>{
            return <option key={index} value={JSON.stringify(slot)}>{new Date(slot.start).toLocaleString()+" "+new Date(slot.end).toLocaleString()}</option>
        })
       }
        </select>
      </div> 

       <div className='flex flex-col gap-y-1'>
                <label htmlFor='startDate'>Start Date</label>
                <input
                type='datetime-local'
                id='startDate'
                placeholder='Enter Your Date'
                {...register("startDate",{required:true})}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
                {
                    errors.startDate && (
                        <span> start Date can't be Empty </span>
                    )
                }
            </div>
            <div className='flex flex-col gap-y-1'>
                <label htmlFor='endDate'>End Date</label>
                <input
                type='datetime-local'
                id='endDate'
                placeholder='Enter Your Date'
                {...register("endDate",{required:true})}
                className='border-[1px] h-[40px] rounded-md w-full px-3'
                />
                {
                    errors.endDate && (
                        <span> end Date can't be Empty </span>
                    )
                }
            </div>
          <div className='flex justify-end'><button className='bg-teal-500 font-bold text-white rounded-md p-2'>Book Now</button></div>
          </form></div>
        <div className='flex flex-col gap-y-3'> 
          <div><Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      // views={[Views.MONTH]}
      className='custom-calendar'
      eventPropGetter={(events)=>({
       style:{backgroundColor:events.status === "Scheduled" ? "yellow" : events.status === "Completed" ? "#2dc04a" : "red",
        color:"black",
        fontWeight:"bold"
        } 
      })
      }
      style={{ height:"403px",width:"403px"}}
    /></div>
   <Day/>

      </div>
      </div>

    </div>
  )
}

export default Sessions