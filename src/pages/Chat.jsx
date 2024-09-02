import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from '../components/core/Chat/SearchBar'
import MyChats from '../components/core/Chat/MyChats'
import ChatBox from '../components/core/Chat/ChatBox'

function Chat() {
    const {token} = useSelector(state=>state.auth)
    const {user} = useSelector(state=>state.profile)
    console.log(user);
    const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <div className="h-screen flex flex-col">
    {/* Sidebar */}
    <div className="bg-blue-600 p-4 text-white">
        <SearchBar />
    </div>

    <div className="flex-grow flex">
        {/* My Chats Section */}
        <div className="w-1/3 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">My Chats</h2>
            {user && <MyChats fetchAgain={fetchAgain} />}
        </div>

        {/* Chat Section */}
        <div className="w-2/3 p-4">
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </div>
    </div>
    </div>
  )
}

export default Chat
