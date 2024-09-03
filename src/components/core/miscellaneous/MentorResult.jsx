import React from 'react';

function UserListItem({ user, handleFunction }) {
  return (
    <div 
      onClick={handleFunction}
      className='bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden cursor-pointer'
    >
      <img src={user.image||"https://guider-ai.com/wp-content/uploads/2022/02/what-is-a-mentor.webp"} alt={user.firstName} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-900'>{user.firstName}</h3>
        <p className='text-gray-700'>{user.email}</p>
      </div>
    </div>
  );
}

export default UserListItem;
