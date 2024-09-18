import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiMail } from "react-icons/ci";

const AllMentees = () => {
  const { users, loading } = useSelector(state => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const menteesPerPage = 10; // Display 10 mentees per page

  // Filter mentees
  const mentees = users?.users?.filter(user => user.accountType === 'Mentee') || [];

  // Get current mentees for pagination
  const indexOfLastMentee = currentPage * menteesPerPage;
  const indexOfFirstMentee = indexOfLastMentee - menteesPerPage;
  const currentMentees = mentees.slice(indexOfFirstMentee, indexOfLastMentee);

  // Calculate total pages
  const totalPages = Math.ceil(mentees.length / menteesPerPage);

  // Pagination handlers
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

  let count = indexOfFirstMentee + 1;

  return (
    <div className='flex flex-col w-full items-center'>
      {!loading ? (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white">
                <td className="px-6 py-3 text-left font-semibold">Sl.No</td>
                <td className="px-6 py-3 text-left font-semibold">Name</td>
                <td className="px-6 py-3 text-left font-semibold">Email</td>
                <td className="px-6 py-3 text-left font-semibold">Action</td>
              </tr>
            </thead>
            {currentMentees.length > 0 ? (
              <tbody>
                {currentMentees.map((mentee) => (
                  <tr key={mentee._id} className='border-t hover:bg-gray-100'>
                    <td className='px-6 py-4 text-gray-700'>{count++}</td>
                    <td className='px-6 py-4 text-gray-700 flex items-center gap-2'>
                      <img className='w-[40px] h-[40px] rounded-full' src={mentee.image ? mentee.image : `https://api.dicebear.com/5.x/initials/svg?seed=${mentee.firstName} ${mentee.lastName}`} alt="" />
                      <p>{mentee.firstName + " " + mentee.lastName}</p>
                    </td>
                    <td className='px-6 py-4 text-gray-700'>{mentee.email}</td>
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
                  <td colSpan="4" className='px-4 py-2 text-center'>No Mentees Found</td>
                </tr>
              </tbody>
            )}
          </table>

          {/* Pagination Controls */}
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
                style={{ width: '40px', height: '40px' }} // Stylish square buttons
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

export default AllMentees;
