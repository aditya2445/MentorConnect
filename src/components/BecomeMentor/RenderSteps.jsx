import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import About from './About'
import Profile from './Profile'
import Experience from './Experience'

const RenderSteps = () => {
    const {step} = useSelector(state=>state.mentor)
    const steps =[
        {
            id:1,
            title:"About"
        },
        {
            id:2,
            title:"Profile"
        },
        {
            id:3,
            title:"Experience"
        }
    ]
  return (
    <div className='w-7/12 mt-10'>
       <div className='flex justify-between w-full relative'>
        {
             
                steps.map((item,index)=>{
                 return <div key={index} className=''><div className='flex flex-col items-center'>
                 <div className='flex'>
                 <div className={`${step>item.id ? "bg-emerald-700" :"bg-white"} w-[40px] z-20 flex items-center justify-center h-[40px] rounded-full border-[1px] border-emerald-700`}>
                   {
                     step>item.id ? <FaCheck className='text-white'/> :<div className={`w-[15px] flex items-center justify-center rounded-full h-[15px] bg-emerald-700 text-white`}>
                    </div> 
                   }
                    </div>
                 </div>
                  <p className='text-xl font-bold'>{item.title}</p>
                 </div>
                 {index === 0 && <div className={`h-[1px] translate-x-10  border-[1px] ${step===2 ? " border-emerald-700" : "border-black"} border-black absolute z-10 bottom-[67%] w-[40%]`}></div> }
                 {index === 1 && <div className={`h-[1px] translate-x-[40px] border-[1px] ${step===3 ? " border-emerald-700" : "border-black"} absolute z-10 bottom-[67%] w-[45%]`}></div> }
                 </div>
                })
        }
       </div>
       <div className='mt-10'>
       {
            step === 1 && <About/>
        }
        {
            step === 2 && <Profile/>
        }
        {
            step === 3 && <Experience />
        }
       </div>
    </div>
  )
}

export default RenderSteps