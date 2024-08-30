import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import {v4} from 'uuid'


const Room = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()
    async function meetingUI(element) {
        const appid = 1663935790 ;
        const server_secret = "00d05c304b8ddd40b0aabf5b0082f8b3"
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appid,
        server_secret,
        roomId,
        v4(),
        "user"
      )

      const ui = ZegoUIKitPrebuilt.create(kitToken)
      ui.joinRoom({
        container:element,
        turnOnCameraWhenJoining:false,
        turnOnMicrophoneWhenJoining:false,
          layout: "Sidebar",
          scenario: {
            mode: "VideoConference",
            config: {
              role: "Host",
          },
        },
      })
    }
  return (
    <div className='flex w-full items-center justify-center mt-10 flex-col gap-y-10  '>
     <div className='flex' ref={meetingUI}></div>
     <button onClick={()=>{navigate("/dashboard/video-calls")
     window.location.reload()
     }} className='bg-blue-600 p-2 rounded-md text-white font-bold w-[30%]' >Join Another Meeting</button>
     </div>
  )
}

export default Room