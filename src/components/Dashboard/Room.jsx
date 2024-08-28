import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import {v4} from 'uuid'


const Room = () => {
    const { roomId } = useParams()
    async function meetingUI(element) {
        const appid = 607540198 ;
        const server_secret = "2c5b7d1ae92e4fe1cd9e49576d283e01"
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
        scenario:{
            mode:ZegoUIKitPrebuilt.VideoConference
        }
      })
    }
  return (
    <div><div>Room {roomId}</div>
     <div ref={meetingUI} ></div></div>
  )
}

export default Room