import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ReviewAResume() {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const [resumes, setResumes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);
    const [status, setStatus] = useState('');
    const [feedback, setFeedback] = useState('');

    const fetchResumes = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.get("http://localhost:3000/api/v1/resume/all", config);
            setResumes(data.data);
            console.log(resumes)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleModal = (resume) => {
        setSelectedResume(resume);
        setIsModalOpen(true);
    }

    const handleStatusChange = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const resumeId = selectedResume._id;
            const email = selectedResume.mentee.email;
            await axios.put(`http://localhost:3000/api/v1/resume/resume-reviews/${resumeId}`, { status,feedback,email }, config);
            setIsModalOpen(false);
            fetchResumes(); // Refresh resumes after update
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <div className='text-center mt-2 font-serif font-bold'>
                Welcome {user?.firstName}
            </div>
            {
    resumes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {
                resumes.map((r, i) => (
                    <div 
                        key={i}
                        className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105"
                    >
                        <div className="flex items-center p-4 bg-teal-600">
                            <img 
                                className="w-16 h-16 rounded-full object-cover border-4 border-white"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-blsvoWQeqmoTzZB3tISQMu2dw8R6TY4IA&s" 
                                alt={`${r.mentee?.firstName}'s profile`} 
                            />
                            <div className="ml-4 text-white">
                                <h2 className="font-bold text-lg">{r.mentee?.firstName + " " + r.mentee?.lastName}</h2>
                                <p className="text-sm">{r.mentee?.email}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50">
                            <div className="text-sm mb-2">
                                <span className="font-medium">Resume URL: </span>
                                <a 
                                    href={r.resumeUrl} 
                                    className="text-teal-600 underline"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    View Resume
                                </a>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Please provide status and necessary feedback.
                            </p>
                            <button 
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                                onClick={() => handleModal(r)}
                            >
                                Provide Feedback
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    ) : (
        <p>Loading...</p>
    )
}


            {/* Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-4 rounded-lg max-w-md w-full'>
                        <h2 className='text-xl font-bold mb-4'>Update Resume Status</h2>
                        <form onSubmit={handleStatusChange}>
                            <div className='mb-4'>
                                <label className='block text-gray-700'>Status</label>
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)} 
                                    className='w-full p-2 mt-2 border rounded'>
                                    <option value=''>Select a status</option>
                                    <option value='O'>OUTSTANDING</option>
                                    <option value='E'>EXCELLENT</option>
                                    <option value='A'>AVERAGE</option>
                                </select>
                                <label className='block text-gray-700'>
                                    Enter Your Feedback
                                </label>
                                    <input
                                    value={feedback}
                                    placeholder='Enter Your Feedback'
                                    onChange={(e)=>setFeedback(e.target.value)}
                                    className='w-full p-2 mt-2 border rounded'
                                    type="text" />
                            </div>
                            <div className='flex justify-end'>
                                <button 
                                    type='button' 
                                    className='bg-gray-500 text-white p-2 rounded mr-2'
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type='submit' 
                                    className='bg-blue-500 text-white p-2 rounded'>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewAResume;
