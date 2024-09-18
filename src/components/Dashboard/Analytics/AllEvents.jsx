import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AllMentees = () => {
  const { users, loading } = useSelector(state => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10; // Limit to 10 events per page

  // Filter events
  const events = users?.events || [];

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate total pages
  const totalPages = Math.ceil(events.length / eventsPerPage);

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

  let count = indexOfFirstEvent + 1;

  return (
    <div className='flex flex-col w-full items-center'>
      {!loading ? (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-400 to-indigo-600 text-white">
                <td className="px-6 py-3 text-left font-semibold">Sl.No</td>
                <td className="px-6 py-3 text-left font-semibold">Mentor</td>
                <td className="px-6 py-3 text-left font-semibold">Mentee</td>
                <td className='px-6 py-3 text-left font-semibold'>Time Interval</td>
                <td className='px-6 py-3 text-left font-semibold'>Room Id</td>
                <td className="px-6 py-3 text-left font-semibold">Status</td>
              </tr>
            </thead>
            {currentEvents.length > 0 ? (
              <tbody>
                {currentEvents.map((event, index) => (
                  <tr key={event._id} className='border-t hover:bg-gray-100'>
                    <td className='px-6 py-4 text-gray-700'>{count++}</td>
                    <td className='px-6 py-4 text-gray-700'>{event?.mentor?.firstName + " " + event?.mentor?.lastName}</td>
                    <td className='px-6 py-4 text-gray-700'>{event?.mentee?.firstName + " " + event?.mentee?.lastName}</td>
                    <td className='px-6 py-4 text-gray-700'>
                      {new Date(event.startDate).toLocaleDateString() + " " + new Date(event.startDate).toLocaleTimeString() + " - " + new Date(event.endDate).toLocaleTimeString()}
                    </td>
                    <td className='px-6 py-4 text-gray-700'>{event.roomId}</td>
                    <td className='px-6 py-4 text-gray-700 flex items-center gap-2'>
                      <span className={`p-2 rounded-md ${event.status === "Scheduled" ? "bg-yellow-300 hover:bg-yellow-400 " : event.status === "OnGoing" ? "bg-blue-600 hover:bg-blue-700 text-white " : event.status === "Completed" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr className='h-[150px]'>
                  <td colSpan="6" className='px-4 py-2 text-center'>No Events Found</td>
                </tr>
              </tbody>
            )}
          </table>

          {/* Pagination Controls */}
          <div className='flex justify-center mt-6'>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 rounded-md border ${currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md border ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'} transition duration-200`}
                style={{ width: '40px', height: '40px' }} // Stylish square buttons
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
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
