import React from 'react'
import SignUpForm from '../components/auth/SignUpForm'

const SignUp = () => {
  return (
    <div className='flex w-screen h-screen'>
    <div className='lg:w-[30%] w-0 lg:bg-teal-500 flex items-center justify-center text-3xl text-white font-bold lg:px-10'>
      Connect with Top Mentors and boost your learning
    </div>
    <div className='w-full lg:w-[70%] flex items-center justify-center h-full'>
      <SignUpForm/>
      </div>
    </div>
  )
}

export default SignUp