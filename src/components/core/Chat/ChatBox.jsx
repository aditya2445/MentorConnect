import React from 'react'
import { useSelector } from 'react-redux'
import SingleChat from './SingleChat';

function ChatBox({fetchAgain,setFetchAgain}) {
    const {selectedChat} = useSelector(state=>state.chat);
  return (
    <div
    className={`h-[100%] p-3 flex bg-pink-300 w-full rounded-lg border border-gray-200`}
    >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
</div>
  )
}

export default ChatBox
