import React from 'react'
import DashBar from '../components/Dashboard/DashBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-col items-center'>
      <DashBar/>
   <div className='flex items-center w-10/12'>
    <Outlet/>
   </div>
    </div>
  )
}

export default Dashboard