// import React, { useEffect, useState } from 'react';
// import { myMentees } from "../../../services/operations/authApi";
// import { FaStar } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { MdOutlineChat } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import { setSelectedChat } from '../../../slice/chatSlice';

// function MyMentees() {
//     const [mentees, setMentees] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const { token } = useSelector(state => state.auth);
//     const { selectedChat } = useSelector(state => state.chat);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchMentees = async () => {
//             setLoading(true);
//             const res = await myMentees(token);
//             if (res) setMentees(res);
//             setLoading(false);
//         };

//         fetchMentees();
//     }, [token]);

//     // Explore chat function: sets the selected chat and navigates to the chat page
//     const exploreChat = (menteeId) => {
//         // Dispatch the mentee's ID as the selected chat
//         dispatch(setSelectedChat(menteeId));
//         // Navigate to the chat page
//         navigate(/dashboard/chats);
//     };

//     return (
//         <div className='w-full text-black'>
//             {!loading && mentees.length > 0 ? (
//                 mentees.map((mentee, index) => (
//                     <div key={mentee._id}>
//                         <div className='w-8/12 mx-auto flex items-center justify-between mt-10 border-[1px] p-2 status gap-y-2'>
//                             <div className='flex gap-x-3 items-center status-photo'>
//                                 <img
//                                     src={mentee?.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
//                                     alt='Load'
//                                     className='lg:w-[100px] lg:h-[100px] object-cover w-[200px] h-[200px]'
//                                 />
//                                 <div className='flex flex-col gap-y-1 status-name'>
//                                     <p>{mentee?.firstName} {mentee?.lastName}</p>
//                                     <div className='flex items-center gap-x-2'>
//                                         <p>Email : {mentee.email}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <button
//                                 className='mr-4 bg-green-500 p-2 rounded-r-lg rounded-t-lg flex items-center gap-2 justify-center'
//                                 onClick={() => exploreChat(mentee?._id)}
//                             >
//                                 <MdOutlineChat />
//                                 <span className='font-bold '>Chat</span>
//                             </button>
//                         </div>
//                         {/* Progress Bar Section */}
//                     </div>
//                 ))
//             ) : (
//                 <div>
//                     <h1>No Mentees</h1>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MyMentees;

import React, { useEffect, useState } from 'react';
import { myMentees } from "../../../services/operations/authApi";
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineChat } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
function MyMentees() {
    const [mentees, setMentees] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.auth);
    const { chats } = useSelector(state => state.chat);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMentees = async () => {
            setLoading(true);
            const res = await myMentees(token);
            if (res) setMentees(res);
            setLoading(false);
        };

        fetchMentees();
    }, [token]);

    // Explore chat function: sets the selected chat and navigates to the chat 

    return (
        <div className='w-full text-black'>
            {!loading && mentees.length > 0 ? (
                mentees.map((mentee, index) => (
                    <div key={mentee._id}>
                        <div className='w-8/12 mx-auto flex items-center justify-between mt-10 border-[1px] p-2 status gap-y-2'>
                            <div className='flex gap-x-3 items-center status-photo'>
                                <img
                                    src={mentee?.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
                                    alt='Load'
                                    className='lg:w-[100px] lg:h-[100px] object-cover w-[200px] h-[200px]'
                                />
                                <div className='flex flex-col gap-y-1 status-name'>
                                    <p>{mentee?.firstName} {mentee?.lastName}</p>
                                    <div className='flex items-center gap-x-2'>
                                        <p>Email : {mentee.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <h1>No Mentees</h1>
                </div>
            )}
        </div>
    );
}

export default MyMentees;