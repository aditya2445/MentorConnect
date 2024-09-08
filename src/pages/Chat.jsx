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
    <div className=" mt-5 flex flex-col w-full">

    <div className="flex-grow  flex p-2 rounded-md">
        {/* My Chats Section */}
        <div className="w-1/3 border-[1px] rounded-md border-gray-300 relative">
            <div className='flex px-3 py-2 flex-col border-b-[1px] absolute top-0 left-0 w-full '><h2 className="text-lg  font-bold mb-4"> Chats</h2>
            <SearchBar /></div>
            {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        

        {/* Chat Section */}
        <div className="w-2/3 px-2">
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </div>
    </div>
    </div>
  )
}

export default Chat
