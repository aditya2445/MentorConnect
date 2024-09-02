import React from 'react';

function MentorDetailsCard({ mentor }) {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
      <img src={mentor.image||`https://api.dicebear.com/5.x/initials/svg?seed=${mentor.firstName} ${mentor.lastName}`} alt={mentor.firstName} className='w-full h-64 object-cover' />
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-gray-900'>{mentor.firstName} {mentor.lastName}</h2>
        <p className='text-gray-700'>{mentor.email}</p>
        <p className='mt-4 text-gray-600'>
          {/* You can add more mentor details here, like bio, skills, etc. */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac semper ante.
        </p>
      </div>
    </div>
  );
}

export default MentorDetailsCard;
