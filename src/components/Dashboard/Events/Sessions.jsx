import React, { useState } from 'react'
import { Calendar, momentLocalizer,Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Day from './Day';
import { useForm } from 'react-hook-form';

const localizer = momentLocalizer(moment)

const calendarEvents = [
  {
      title: 'Meeting',
      start: new Date(2024, 9, 1, 10, 0), 
      end: new Date(2024, 9, 1, 12, 0),
      color:"#222222"    
    },
];

const Sessions = () => {
  const [events, setevents] = useState(calendarEvents)
  const {handleSubmit,register,reset,formState:{errors}} = useForm()
  const onsubmit = (data)=>{
 console.log(data)
 reset()
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
          <div className='flex justify-end'><button className='bg-teal-500 font-bold text-white rounded-md p-2'>Book Now</button></div>
          </form></div>
        <div className='flex flex-col gap-y-3'> 
          <div><Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={[Views.MONTH]}
      className='custom-calendar'
      eventPropGetter={(events)=>({
        style:{backgroundColor:'green'}
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