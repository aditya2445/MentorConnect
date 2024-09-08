import React from 'react'
import { useSelector } from 'react-redux'

function UserListItem({ user,handleFunction }) {
  return (
    <div 
    onClick={handleFunction}
    className=' hover:bg-green-400 w-[100%] bg-white flex items-center text-black px-1 py-1 mb-1 rounded-lg'
    >
      <img src={user.image} alt={user.firstName} className='mr-1 rounded-lg h-[20px] w-[20px]' />
      <div>
        <p>
            {user.firstName}
        </p>
        <p>
            {user.email}
        </p>
      </div>
    </div>
  )
}

export default UserListItem
