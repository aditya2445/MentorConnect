import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setMentorExp, setStep } from '../../slice/mentorSlice'
import { createMentorApp } from '../../services/operations/mentorApi'
import { useNavigate } from 'react-router-dom'


const Experience = () => {
  const dispatch = useDispatch()
  const {register,
    getValues,
    setValue,handleSubmit,
    formState:{errors}
} = useForm()
const [loading, setloading] = useState(false)
const navigate = useNavigate()
  const {mentorProfile,mentorExp} = useSelector(state=>state.mentor)
  const {token} = useSelector(state=>state.auth)
  useEffect(()=>{
  if(mentorExp){
    setValue("whyDoYouWantToBecomeMentor",mentorExp?.whyDoYouWantToBecomeMentor)
    setValue("achievements",mentorExp?.achievements)
  }
  },[])
  const onsubmit = async(data)=>{
  const updatedMentor ={
    ...mentorProfile,
    whyDoYouWantToBecomeMentor:data.whyDoYouWantToBecomeMentor,
    achievements:data.achievements 
  }
  setloading(true)
  const response = await createMentorApp(updatedMentor,token)
  setloading(false)
  window.location.reload()
  }
  const prevHandler = ()=>{
   const updatedMentor = {
    whyDoYouWantToBecomeMentor:getValues("whyDoYouWantToBecomeMentor"),
    achievements:getValues("achievements")
   }
   dispatch(setMentorExp(updatedMentor))
   dispatch(setStep(2));
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-3'>
      <div className='flex flex-col gap-y-1'>
        <label htmlFor="whyDoYouWantToBecomeMentor">Why do you want to become a mentor? (Not publicly visible)</label>
        <textarea
        name='whyDoYouWantToBecomeMentor'
        placeholder='Mention reasons...'
        {...register("whyDoYouWantToBecomeMentor",{required:true})}
        className='border-[1px] min-h-[60px] p-2'
        />
        {
          errors.whyDoYouWantToBecomeMentor && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
       <div className='flex flex-col gap-y-1'>
        <label htmlFor="achievements">Write About Some Of Your Achievements 
        </label>
        <textarea
        name='achievements'
        placeholder='Write Something About Your Achievements...'
        {...register("achievements",{required:true})}
        className='border-[1px] min-h-[60px] p-2'
        />
        {
          errors.achievements && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
       <div className='flex justify-between'>
       <button  type='button' onClick={prevHandler} className='bg-emerald-700 rounded-md p-1 md:p-2 text-white'>Previous step</button>
       <button disabled={loading} className='bg-emerald-700 rounded-md p-1 md:p-2 text-white'>Submit</button>
       </div>
      </form>
    </div>
  )
}

export default Experience