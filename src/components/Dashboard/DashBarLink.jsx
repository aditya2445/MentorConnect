import React from 'react';
import * as Icons from "react-icons/vsc";
import { Link, matchPath, useLocation } from 'react-router-dom';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from 'react-redux';

const DashBarLink = ({ item }) => {
  const location = useLocation();
  const { user } = useSelector(state => state.profile);
  
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  const Icon = Icons[item.icon];
  
  return (
    <div className="relative group">
      {
        item.name === "Events" 
          ? <div className='relative group'>
              <p className={`flex items-center gap-x-1 cursor-pointer text-gray-700 font-medium transition-colors duration-200 hover:text-indigo-600`}>
                <span><Icon /></span>{item.name} 
                <MdKeyboardArrowDown className='text-lg'/>
              </p>
              <div className='absolute z-40 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:visible invisible flex flex-col gap-y-2 border border-gray-200 shadow-lg rounded-md top-8 items-center p-2 w-[180px]'>
                {user?.accountType === "Mentee" && <Link to={"/dashboard/sessions"} className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>Book A Session</Link>}
                {user?.accountType === "Mentor" && <Link to={"/dashboard/time-slots"} className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>Add Time Slots</Link>}
                {user?.accountType === "Mentor" && <Link className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>Webinars</Link>}
                {user?.accountType === "Mentor" && <Link to={"/resume/review"} className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>Review Resume</Link>}
                {user?.accountType === "Mentee" && <Link to={"/resume-post"} className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>Resume Post</Link>}
                {user?.accountType === "Mentee" && <Link to={"/premium"} className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>Offers</Link>}
                {user?.accountType === "Mentor" && <Link to={"/create-premium"} className='w-full text-center hover:bg-gray-100 py-2 rounded-md'>My Premium</Link>}
              </div>
            </div>  
          : <Link 
              className={`flex items-center gap-x-2 px-4 py-2 rounded-md transition-all duration-200 ${matchRoute(item.linkto) ? "border-b-4 border-indigo-500 text-indigo-600" : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"}`} 
              to={item.linkto}
            >
              <span><Icon /></span>{item.name}
            </Link>
      }
    </div>
  );
}

export default DashBarLink;
