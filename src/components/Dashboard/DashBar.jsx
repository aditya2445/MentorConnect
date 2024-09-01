import React from 'react'
import {Mentee,Mentor,Admin} from '../../data/DashBarLinks'
import { useSelector } from 'react-redux'
import DashBarLink from './DashBarLink'

const DashBar = () => {
    const {user} = useSelector(state=>state.profile)
    
  return (
    <div className='flex items-center justify-between w-8/12 h-[40px] border-b-[1px]  font-semibold '>
     {
       user?.accountType === "Mentee" && (
        Mentee.map((item,index)=>{
            return <DashBarLink key={index} item={item}/>
        })
       )
     }
     {
       user?.accountType === "Mentor" && (
        Mentor.map((item,index)=>{
            return <DashBarLink key={index} item={item}/>
        })
       )
     }
     {
       user?.accountType === "Admin" && (
        Admin.map((item,index)=>{
            return <DashBarLink key={index} item={item}/>
        })
       )
     }
    </div>
  )
}

export default DashBar