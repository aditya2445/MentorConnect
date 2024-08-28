import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMentorProfile, setStep } from '../../slice/mentorSlice'
import { useForm } from 'react-hook-form'
import { MdCancel } from "react-icons/md";
import { showAllCategory } from '../../services/operations/categoryApi';

const Profile = () => {
    const dispatch = useDispatch()
    const {mentorProfile,mentor} = useSelector(state=>state.mentor)
    const {register,
      getValues,
      setValue,handleSubmit,
      formState:{errors}
  } = useForm()

  const [skills, setskills] = useState([])
  const [skill, setskill] = useState("")

  const handleAdd = ()=>{
      if(skill){
        setskills([...skills,skill])
        setskill("")
      }}
  
  const handleRemove =(index)=>{
  const updatedSkills = [...skills]
  updatedSkills.splice(index,1)
  setskills(updatedSkills)
  }
  useEffect(()=>{
    if(mentorProfile){
      setskills(JSON.parse(mentorProfile?.skills))
    }
  register("skills",{required:true})
  },[])
  useEffect(()=>{
  setValue("skills",skills)
  },[skills])
  useEffect(()=>{
    if(mentorProfile){
     setValue("about",mentorProfile?.about)
     setValue("category",mentorProfile?.category)
     setValue("linkedInUrl",mentorProfile?.linkedInUrl)
     setValue("githubUrl",mentorProfile?.githubUrl)
    }
  },[])

  const onsubmit = (data)=>{
  const updatedMentor = {...mentor,
    about:data.about,
    category:data.category,
    skills:JSON.stringify(data.skills),
    linkedInUrl:data.linkedInUrl,
    githubUrl:data.githubUrl
  };
  dispatch(setMentorProfile(updatedMentor))
  dispatch(setStep(3))
  }
  const [categories, setcategories] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(()=>{
  const fetchCategories = async()=>{
    setloading(true)
    const res = await showAllCategory();
    setcategories(res);
   setloading(false)
  }
  fetchCategories()
  },[])
  const prevHandler = ()=>{
    const updatedMentor = {
      about:getValues("about"),
    category:getValues("category"),
    skills:JSON.stringify(getValues("skills")),
    linkedInUrl:getValues("linkedInUrl"),
    githubUrl:getValues("githubUrl")
    }
    dispatch(setMentorProfile(updatedMentor))
    dispatch(setStep(1))

  }
  return ( 
    <div className='flex flex-col  '>
      { loading ? (<div className='w-full h-screen flex items-center justify-center'><div className='spinner'></div></div>) :
     <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-4'>
     <div className='flex flex-col gap-y-1'>
        <label  htmlFor='category'>Category</label>
        <select 
        name='category'
        defaultValue=""
        {...register("category",{required:true})}
        className='border-[1px] h-[40px] rounded-md  px-3'
        >
        <option className='' value="" disabled >Choose a Category</option>
       {
            categories?.map((category,index)=>{
            return <option key={index} selected={mentorProfile?.category === category._id ? "selected" : ""} value={category._id}>{category.name}</option>
        })
       }
        </select>
        {
            errors.category && (
                <span className=''> Category is Required</span>
            )
        }
       </div>
       <div className='flex flex-col items-start gap-y-1'>
        <label htmlFor='skills'>skills</label>
       <div className='border-[1px] w-full min-h-[40px] rounded-md px-3 flex items-center gap-x-2'>
        <div className='flex gap-x-2'>
          {
            skills.map((skill,index)=>{
              return <p className='flex items-center' key={index}>{skill} <MdCancel onClick={()=>handleRemove(index)}/></p>
            })
          }
        </div>
       <input
        type='text'
        name='skills'
        placeholder='Add Your Skills...'
        value={skill}
        onChange={(e)=>setskill(e.target.value)}
        className='outline-none'
        />
       </div>
       <button type='button' className=' bg-emerald-700 p-2 rounded-md text-white ' onClick={handleAdd}>Add</button>
        <p>Describe your expertise to connect with mentees who have similar interests.
Comma-separated list of your skills (keep it below 10). Mentees will use this to find you.</p>
{
  errors.skills && ( <span>Add some of your skills</span>)
}
       </div>
       <div className='flex flex-col gap-y-1'>
        <label htmlFor="about">Bio</label>
        <textarea
        name='about'
        placeholder='Write Something About Yourself...'
        {...register("about",{required:true})}
        className='border-[1px] min-h-[60px] p-2'
        />
        <p>Tell us (and your mentees) a little bit about yourself. Talk about yourself in the first person, as if you'd directly talk to a mentee. This will be public.</p>
        {
          errors.about && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
       <div className='md:flex gap-x-3 w-full'>
       <div className='flex flex-col gap-y-1 md:w-[50%]'>
        <label htmlFor="linkedInUrl">LinkedIn URL</label>
        <input
        type='url'
        name='linkedInUrl'
        {...register("linkedInUrl",{required:true})}
        className='border-[1px] rounded-md h-[40px] p-2'
        />
        {
          errors.linkedInUrl && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
       <div className='flex flex-col gap-y-1 md:w-[50%]'>
        <label htmlFor="githubUrl">Github URL</label>
        <input
        type='url'
        name='githubUrl'
        {...register("githubUrl",{required:true})}
        className='border-[1px] rounded-md h-[40px] p-2'
        />
        {
          errors.githubUrl && (
            <span>This field cant be Empty</span>
          )
        }
       </div>
       </div>
       <div className='flex justify-between gap-x-2'>
       <button type='button' onClick={prevHandler} className='bg-emerald-700 rounded-md  md:p-2 text-white'>Previous step</button>
       <button className='bg-emerald-700 rounded-md md:p-2  text-white'>Next step</button>
       </div>
      
     </form>}
    </div>
  )
}

export default Profile