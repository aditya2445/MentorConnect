import React from 'react'
import MenteeProfile from './MenteeProfile'
import { useSelector } from 'react-redux'
import MentorProfile from './MentorProfile'

const Profile = () => {
  const {user} = useSelector(state=>state.profile)
  return (
    <div className='flex items-center w-full justify-center mt-24 '>
      {user?.accountType === "Mentor" && <MentorProfile/>}
      {user?.accountType === "Mentee" && <MenteeProfile/>}
    </div>
  )
}

export default Profile