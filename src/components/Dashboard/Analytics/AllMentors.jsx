import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiMail } from "react-icons/ci";

const AllMentors = () => {
  const { users, loading } = useSelector(state => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 10; // Limit to 10 mentors per page

  // Filter mentors from the user list
  const mentors = users?.users?.filter(user => user.accountType === 'Mentor') || [];

  // Get the current mentors based on pagination
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = mentors.slice(indexOfFirstMentor, indexOfLastMentor);

  // Calculate total pages
  const totalMentors = mentors.length;
  const totalPages = Math.ceil(totalMentors / mentorsPerPage);

  // Pagination controls
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  let count = indexOfFirstMentor + 1;

  return (
    <div className='flex flex-col w-full items-center'>
      {!loading ? (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-400 to-indigo-600 text-white">
                <td className="px-6 py-3 text-left font-semibold">Sl.No</td>
                <td className="px-6 py-3 text-left font-semibold">Name</td>
                <td className="px-6 py-3 text-left font-semibold">Email</td>
                <td className="px-6 py-3 text-left font-semibold">Action</td>
              </tr>
            </thead>
            {currentMentors.length > 0 ? (
              <tbody>
                {currentMentors.map((mentor, index) => (
                  <tr key={mentor._id} className='border-t hover:bg-gray-100'>
                    <td className='px-6 py-4 text-gray-700'>{count++}</td>
                    <td className='px-6 py-4 text-gray-700 flex items-center gap-2'>
                      <img
                        className='w-[40px] h-[40px] rounded-full'
                        src={mentor.image 
                          ? mentor.image 
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${mentor.firstName} ${mentor.lastName}`}
                        alt=""
                      />
                      <p>{mentor.firstName + " " + mentor.lastName}</p>
                    </td>
                    <td className='px-6 py-4 text-gray-700'>{mentor.email}</td>
                    <td className='px-6 py-4 text-gray-700 flex items-center gap-2'>
                      <button className='p-2 flex items-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md text-white shadow-lg transform transition-transform duration-200 hover:scale-105'>
                        <RiDeleteBin6Line />
                        <span>Delete</span>
                      </button>
                      <button className='p-2 bg-[#34c62f] flex items-center gap-2 rounded-md hover:bg-[#34c63f] active:bg-[#34c62f] text-white shadow-lg transform transition-transform duration-200 hover:scale-105'>
                        <CiMail />
                        <span>Send Mail</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr className='h-[150px]'>
                  <td colSpan="4" className='px-4 py-2 text-center'>No Mentors Found</td>
                </tr>
              </tbody>
            )}
          </table>

          {/* Stylish Pagination Controls */}
          <div className='flex justify-center mt-6'>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 rounded-md border ${currentPage === 1 ? 'bg-gray-300' : 'bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white hover:bg-indigo-500'}`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md border ${currentPage === index + 1 ? 'bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'} transition duration-200`}
                style={{ width: '40px', height: '40px' }} // Square buttons
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white hover:bg-indigo-500'}`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className='w-full h-[500px] flex items-center justify-center'>
          <div className='spinner'></div>
        </div>
      )}
    </div>
  );
};

export default AllMentors;

