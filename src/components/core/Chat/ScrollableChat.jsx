import React from 'react';
import { useSelector } from 'react-redux';
import {
    isSameSender,
    isSameSenderMargin,
    isSameUser,
    isLastMessage,
} from "../../../config/chatLogics";
import ScrollableFeed from 'react-scrollable-feed';

function ScrollableChat({ messages }) {
    const { user } = useSelector(state => state.profile);

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => {
                const messageSenderId = m.sender?._id; // Safely access _id
                const isUserMessage = messageSenderId === user._id;
                return (
                    <div className='flex mt-1' key={m._id}>
                        {/* Conditionally render the sender's avatar and name */}
                        {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                            <div className='flex flex-col items-center'>
                                <img
                                    className='w-8 h-8 rounded-full cursor-pointer mt-1 mr-1'
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXpwfHdb-GjwR1YD1CKhja0ggOsVS50qhXvw&s"
                                    alt={m.sender.firstName}
                                />
                            </div>
                        )}

                        {/* Message alignment based on the sender */}
                        <span
                            className={`${
                                isUserMessage ? 'bg-green-400 ml-auto' : 'bg-cyan-400'
                            } ml-[${isSameSenderMargin(messages, m, i, user._id)}] mt-[${isSameUser(messages, m, i, user._id) ? 3 : 10}] rounded-md px-1 py-1 max-w-[75%]`}
                        >
                            {m.content}
                        </span>
                    </div>
                );
            })}
        </ScrollableFeed>
    );
}

export default ScrollableChat;
