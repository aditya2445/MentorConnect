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
                Welcome {user.firstName}
            </div>
            {
                resumes ? (
                    <div>
                        {
                            resumes.map((r, i) => (
                                <div className='border max-w-fit mt-2 mb-2 border-black flex rounded-xl m-auto shadow-lg bg-teal-500'
                                    key={i}>
                                    <div className='flex flex-col items-center gap-1 m-2 bg-gray-300 rounded-lg p-2 font-serif'>
                                        <div>
                                            <img
                                                className='rounded-full'
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-blsvoWQeqmoTzZB3tISQMu2dw8R6TY4IA&s"
                                                alt="" />
                                        </div>
                                        <div>
                                            {r.mentee.firstName + " " + r.mentee.lastName}
                                        </div>
                                    </div>
                                    <div className=' flex  flex-col bg-gray-200 m-2 rounded-lg justify-center gap-5 p-2 font-serif'>
                                        <div>
                                            My Email: {r.mentee.email}
                                        </div>
                                        <div className='text-sm'>
                                            My Url:
                                            <a href={r.resumeUrl} className='flex'>
                                                Click Here: Link For The Image of resume.
                                            </a>
                                            <br />
                                            <p>
                                                Provide Status And necessary Feedback.
                                            </p>
                                        </div>
                                        <div className='mb-2'>
                                            <button className='bg-green-500 rounded-lg p-2'
                                                onClick={() => handleModal(r)}
                                            >
                                                Give Status
                                            </button>
                                        </div>
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
