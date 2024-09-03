import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VideoCalls = () => {
   
    const [roomId, setroomId] = useState("")

    const navigate = useNavigate()
    const handleJoin = useCallback(()=>{
      navigate(`/video-calls/${roomId}`)
    },[navigate,roomId])

        
    
  return (
    <div className='flex items-center justify-center w-full h-[600px] '>
       <div className='flex flex-col gap-y-3'>
       <input type="text"
   placeholder='Enter room ID'
   value={roomId}
   onChange={(event)=>setroomId(event.target.value)}
   className='border-[1px] rounded-md h-[40px] p-2'
   />
   <button className='bg-blue-600 text-white font-bold h-[40px]  rounded-md' onClick={handleJoin}>Join</button>
       </div>
    </div>
  )
}

export default VideoCalls