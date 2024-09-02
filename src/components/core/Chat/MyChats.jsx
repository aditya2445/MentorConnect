import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChats, setSelectedChat } from '../../../slice/chatSlice';
import axios from 'axios';

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
    <div>
      {
        chats?(
            (<div>
                {chats.map((chat)=>(
                        <div onClick={()=>dispatch(setSelectedChat(chat))}
                        className={`${selectedChat === chat?"bg-green-600":"bg-red-400"} px-1 py-1 rounded-lg mb-1`}
                        key={chat._id}
                        >
                            {
                                chat?getSender(loggedUser,chat.users):
                                chat.chatName
                            }
                            {
                                chat.latestMessage && (
                                    <div className='text-sm'>
                                        {chat.latestMessage.content.length > 50
                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                        : chat.latestMessage.content}
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>)
        ):(<p>ChatLoading</p>)
      }
    </div>
  )
}

export default MyChats
