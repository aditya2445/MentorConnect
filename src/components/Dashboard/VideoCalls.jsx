import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VideoCalls = () => {
    const [roomId, setroomId] = useState("")
    const navigate = useNavigate()
    const handleJoin = ()=>{
        navigate(`/video-calls/${roomId}`)
    }
  return (
    <div>
        <input type="text"
   placeholder='Enter room ID'
   value={roomId}
   onChange={(event)=>setroomId(event.target.value)}
   />
   <button onClick={handleJoin}>Join</button>
    </div>
  )
}

export default VideoCalls