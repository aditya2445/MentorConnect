import React from 'react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function MentorDetailsCard({ mentor }) {
  const navigate = useNavigate();
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden w-[50%]'>
      <img src={mentor.image||`https://api.dicebear.com/5.x/initials/svg?seed=${mentor.firstName} ${mentor.lastName}`} alt={mentor.firstName} className='w-full h-64 object-cover' />
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-gray-900'>{mentor.firstName} {mentor.lastName}</h2>
        <p className='text-gray-700'>{mentor.email}</p>
        <IoChatbubbleEllipsesOutline 
        className='w-4 h-4 m-2'
        onClick={()=>navigate("/chats")}
        />
        <p className='mt-4 text-gray-600'>
          {/* You can add more mentor details here, like bio, skills, etc. */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac semper ante.
        </p>
      </div>
    </div>
  );
}

export default MentorDetailsCard;
