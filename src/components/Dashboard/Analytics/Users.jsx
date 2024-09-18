import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { SetLoading, SetUsers } from '../../../slice/adminSlice'

const Users = () => {
    const location =useLocation()
    const {token} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
   const fetchUsers = async()=>{
    dispatch(SetLoading(true))
    const res = await getAllUsers(token)
    if(res)
    dispatch(SetUsers(res));
    dispatch(SetLoading(false))
   }
   fetchUsers()
    },[])
  return (
    <div className='flex flex-col w-full  mt-10 items-center'>
   <div className='flex gap-x-6 self-start mt-4'>
      <p
        className={`cursor-pointer font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 transform ${
          location.pathname === "/dashboard/users/mentors"
            ? "text-white bg-purple-700 shadow-md scale-105"
            : "text-gray-600 hover:text-purple-700 hover:bg-gray-200 hover:shadow-lg"
        }`}
        onClick={() => navigate("/dashboard/users/mentors")}
      >
        Mentors
      </p>

      <p
        className={`cursor-pointer font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 transform ${
          location.pathname === "/dashboard/users/mentees"
            ? "text-white bg-purple-700 shadow-md scale-105"
            : "text-gray-600 hover:text-purple-700 hover:bg-gray-200 hover:shadow-lg"
        }`}
        onClick={() => navigate("/dashboard/users/mentees")}
      >
        Mentees
      </p>

      <p
        className={`cursor-pointer font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 transform ${
          location.pathname === "/dashboard/users/events"
            ? "text-white bg-purple-700 shadow-md scale-105"
            : "text-gray-600 hover:text-purple-700 hover:bg-gray-200 hover:shadow-lg"
        }`}
        onClick={() => navigate("/dashboard/users/events")}
      >
        Events
      </p>

      <p
        className={`cursor-pointer font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 transform ${
          location.pathname === "/dashboard/users/posts"
            ? "text-white bg-purple-700 shadow-md scale-105"
            : "text-gray-600 hover:text-purple-700 hover:bg-gray-200 hover:shadow-lg"
        }`}
        onClick={() => navigate("/dashboard/users/posts")}
      >
        Posts
      </p>
    </div>

    <div className='my-10 w-full'><Outlet/></div>
    </div>
  )
}

export default Users