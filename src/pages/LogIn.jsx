import React from 'react'
import LogInForm from '../components/auth/LogInForm'

const LogIn = () => {
  return (
    <div className='flex  w-screen h-screen'>
    <div className='lg:w-[30%] w-0 lg:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 flex items-center justify-center text-3xl text-white font-bold lg:px-10'>
      Connect with Top Mentors and boost your learning
    </div>
    <div className='w-full lg:w-[70%] flex items-center justify-center h-full'>
      <LogInForm/> 
      </div>
    </div>
  )
}

export default LogIn