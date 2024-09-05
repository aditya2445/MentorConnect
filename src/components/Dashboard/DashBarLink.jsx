import React from 'react'
import * as Icons from "react-icons/vsc"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from 'react-redux';


const DashBarLink = ({item}) => {
  const location = useLocation();
  const {user} = useSelector(state=>state.profile)
const matchRoute=(route)=>{
  return matchPath({path:route},location.pathname)
}

    const Icon = Icons[item.icon]
  return (<div >
    {
       item.name === "Events" 
       ? <div className='relative group'>
        <p className={`flex items-center  gap-x-1`}><span><Icon/> </span>{item.name} <MdKeyboardArrowDown className='text-lg'/></p>
        <div className='absolute z-40 bg-white  invisible transition-all duration-200 group-hover:visible flex gap-y-2 border-[1px] rounded-md top-8 items-center p-2 divide-y-[1px] flex-col w-[150px]'>
      {user?.accountType==="Mentee" && <Link to={"/dashboard/sessions"} className='w-full'>Book A Session</Link>}
      {user?.accountType === "Mentor" && <Link to={"/dashboard/time-slots"} className='w-full'>Add Time Slots</Link>}
      {user?.accountType === "Mentor" && <Link  className='w-full'>Webinars</Link>}
      <Link  className='w-full'>Interview Prep</Link>
      <Link  className='w-full'>Offers</Link>
    </div>
       </div>  
       : <Link className={`flex items-center gap-x-1 ${matchRoute(item.linkto)?"border-b-[3px] border-teal-500":"text-black"}`} to={item.linkto}><span><Icon/> </span>{item.name}</Link>
    }
    </div>
  )
}

export default DashBarLink