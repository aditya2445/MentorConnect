import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
function ProfileModal({user,children}) {
    const [isOpen,setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  return (
    <>
    {children ? (
      <span onClick={openModal} className="cursor-pointer">
        {children}
      </span>
    ) : (
      <button onClick={openModal} className="flex items-center justify-center p-2 bg-gray-200 rounded-full">
        <FaEye className="w-3 h-3 " />
      </button>
    )}

    {isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-sans text-center">{user.firstName+user.lastName}</h2>
            <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center p-6">
            <img
              className="w-36 h-36 rounded-full border"
              src={user.image}
              alt={user.firstName}
            />
            <p className="text-lg font-sans mt-4">Email: {user.email}</p>
          </div>
          <div className="flex justify-center p-4 border-t">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default ProfileModal
