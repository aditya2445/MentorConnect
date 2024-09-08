import React, { useEffect, useRef } from 'react';
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
    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
      useEffect(() => scrollToBottom(),[messages]);
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
                            </div>
                        )}

                        {/* Message alignment based on the sender */}
                        <span
                            className={`${
                                isUserMessage ? 'bg-[#DCF8C6] ml-auto rounded-l-lg rounded-b-lg' : 'bg-[#E3F2FD] rounded-r-lg rounded-b-lg'
                            } ml-[${isSameSenderMargin(messages, m, i, user._id)}] mt-[${isSameUser(messages, m, i, user._id) ? 3 : 10}] p-2 max-w-[75%]`}
                        >
                            {m.content}
                        </span>
                    </div>
                );
            })}
             <div ref={messageEndRef} />
        </ScrollableFeed>
    );
}

export default ScrollableChat;
