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
    const handleSearch = (query) =>{
        console.log("Searching for:",query);
    }
    const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <div>
      <div className='flex justify-around w-[100vw] h-[100vh]'>
        {/* sidebar */}
            <div className='w-[30%] bg-slate-300'>
              <div className='w-full h-full rounded-lg border-8 border-gray-200'>
                <SearchBar onSearch={handleSearch}/>
                <br />
                {user && <MyChats fetchAgain={fetchAgain}/>}
              </div>
            </div>
        {/* chat section */}
            <div className='w-[70%]'>
              {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
            </div>
      </div>
    </div>
  )
}

export default Chat
