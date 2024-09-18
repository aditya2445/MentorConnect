import React, { useEffect, useState } from 'react'
import { myMentors } from "../../../services/operations/authApi";
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function MyMentors() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(false);
    var a = 0;
    const { token } = useSelector(state => state.auth);
    const maxSessions = 30; // Maximum sessions in a month

    useEffect(() => {
        const fetchMentors = async () => {
            setLoading(true);
            const res = await myMentors(token);
            if (res) setMentors(res);
            setLoading(false);
        };

        fetchMentors();
    }, [token]);

    const calculateProgress = (attendedSessions) => {
        return (attendedSessions / maxSessions) * 100;
    };

    return (
        <div className='w-full text-black'>
            {
                !loading && mentors.length > 0 ? (
                    mentors.map((mentor, index) => (
                        <div key={mentor._id}>
                            <div className='w-full flex items-center justify-between mt-10 border-[1px] p-2 status gap-y-2'>
                                <div className='flex gap-x-3 items-center status-photo'>
                                    <img src={mentor?.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"} alt='profile' className='lg:w-[100px] lg:h-[100px] object-cover w-[200px] h-[200px]' />
                                    <div className='flex flex-col gap-y-1 status-name'>
                                        <p>{mentor?.firstName} {mentor?.lastName}</p>
                                        <div className='flex  items-center gap-x-2'>
                                            <p>Email : {mentor.email}</p>
                                        </div>
                                        <p className='flex gap-x-2 items-center'>Rating :
                                            <span className='text-yellow-400'><FaStar /></span> 
                                            <span className='text-yellow-400'><FaStar /></span> 
                                            <span className='text-yellow-400'><FaStar /></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Progress Bar Section */}
                            {a = Math.floor(Math.random() * 30+index)}
                            <div className='mt-4'>    
                                <p>Sessions attended this month: {a} / {maxSessions}</p>
                                <div className='w-full bg-gray-200 rounded-full h-4'>
                                    <div 
                                        className='bg-blue-500 h-4 rounded-full' 
                                        style={{ width: `${calculateProgress(a)}%` }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <h1>No Mentors</h1>
                    </div>
                )
            }
        </div>
    )
}

export default MyMentors;