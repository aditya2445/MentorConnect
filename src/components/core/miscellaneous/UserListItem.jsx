import React from 'react'
import { useSelector } from 'react-redux'

function UserListItem({ user,handleFunction }) {
  return (
    <div 
    onClick={handleFunction}
    className='bg-slate-500 hover:bg-green-400 w-[100%] flex items-center text-white px-1 py-1 mb-1 rounded-lg'
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
