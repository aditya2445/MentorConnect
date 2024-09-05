import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { timeUpdates } from '../../../services/operations/sessionApi';


const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.profile);
  let ui;
  let start, end;

  const timeHandler = async(action) => {
    if (action === 'JOIN') {
      start = Date.now();
    } else {
      end = Date.now();
      const data ={
        join:start,
        leave:end,
        roomId:roomId,
        role:user?.accountType
      }
      const res = await timeUpdates(data) 
    }
  };
 
  const meetingUI = async (element) => {
    const appid = 1663935790;
    const server_secret = '00d05c304b8ddd40b0aabf5b0082f8b3';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appid,
      server_secret,
      roomId,
      user._id,
      user.firstName
    );

    ui = ZegoUIKitPrebuilt.create(kitToken);
    ui.joinRoom({
      container: element,
      onJoinRoom: () => {
        timeHandler('JOIN');
      },
      onLeaveRoom: () => {
        timeHandler('LEFT');
        toast.success('You have left the meeting.');
      },
      
      turnOnCameraWhenJoining: false,
      showLeavingView: false,
      turnOnMicrophoneWhenJoining: false,
      layout: 'Sidebar',
      scenario: {
        mode: 'VideoConference',
        config: {
          role:"Attendee",
        },
      },
    });
  };

  useEffect(() => {
    const element = document.getElementById('meeting-container');
    meetingUI(element);

    return () => {
      if (ui) {
        ui.destroy();
      }
    };
  }, []);

  return (
    <div className="flex w-full items-center h-full justify-center mt-10 flex-col gap-y-10">
      <div className='h-screen w-screen bg-white z-50 absolute top-0' id="meeting-container"></div>
    </div>
  );
};

export default Room;
