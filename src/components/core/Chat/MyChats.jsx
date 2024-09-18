import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setSelectedChat } from '../../../slice/chatSlice';
import axios from 'axios';
import { getSenderFull } from '../../../config/chatLogics';

function MyChats({fetchAgain}) {
    const [loggedUser,setLoggedUser] = useState();
    const {chats,selectedChat} = useSelector(state=>state.chat);
    const {user} = useSelector(state=>state.profile);
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const getSender = (loggedUser, users) => {
        console.log("chatlogics",users);
        return users[0]?._id === loggedUser?._id ? users[1]?.firstName : users[0]?.firstName;
    };
    const fetchChats = async()=>{
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
            const {data} = await axios.get("/api/v1/chat/",config);
            console.log("data here is",data);
            dispatch(setChats(data.data));
            // console.log(chats);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        setLoggedUser(user);
        fetchChats();
    },[fetchAgain])
    console.log("chats",chats);
  return (
    <div  className='mt-[100px] h-[550px] px-3 overflow-y-scroll'>
      {
        chats?(
            (<div className='divide-y-[1px]  '>
                {chats?.map((chat)=>{
                   const userDetails = getSenderFull(loggedUser,chat?.users);
                   console.log(userDetails)
                        return <div onClick={()=>dispatch(setSelectedChat(chat))}
                        className={`${selectedChat === chat?"bg-[#DCF8C6]":"bg-white"}  h-[60px] p-2 rounded-lg mb-1 flex items-center`}
                        key={chat._id}
                        >   
                           <div className='flex items-center gap-x-3'>
                            <img src={userDetails?.image ? userDetails?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${userDetails?.firstName} ${userDetails?.lastName }`} alt="" className='h-[40px] w-[40px] rounded-full' />
                           <div className='flex flex-col'>
                            <p>{userDetails?.firstName+" "+userDetails?.lastName}</p>
                           
                            {
                                chat?.latestMessage && (
                                    <div className='text-sm'>
                                        {chat?.latestMessage?.content?.length > 50
                                        ? chat?.latestMessage?.content?.substring(0, 51) + "..."
                                        : chat?.latestMessage?.content}
                                    </div>
                                )
                            }
                            </div>
                           </div>
                        </div>
})
                }
            </div>)
        ):(<p>ChatLoading</p>)
      }
    </div>
  )
}

export default MyChats
