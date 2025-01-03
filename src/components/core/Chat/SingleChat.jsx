import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setSelectedChat } from '../../../slice/chatSlice'
import { IoMdArrowRoundBack } from "react-icons/io";
import {getSender,getSenderFull} from "../../../config/chatLogics"
import ProfileModal from "../miscellaneous/ProfileModal"
import ScrollableChat from './ScrollableChat';
import axios from "axios"
import "./styles.css"
import io from "socket.io-client"
import { addNotification, setSelectedChat } from '../../../slice/chatSlice';
import Lottie from 'react-lottie';
import animationData from "./Animations/typing.json"

const ENDPOINT = "http://localhost:3000"
var socket, selectedChatCompare;
function SingleChat({fetchAgain,setFetchAgain}) {
    const {selectedChat} = useSelector(state=>state.chat);
    const {user} = useSelector(state=>state.profile);
    const {token} = useSelector(state=>state.auth);
    const [messages,setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const {notification} = useSelector(state=>state.chat);
    const [socketConnected, setSocketConnected] = useState(false);
    const dispatch = useDispatch();
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          setLoading(true);
          const { data } = await axios.get(
            `/api/v1/message/${selectedChat._id}`,
            config
          );
          console.log(data);
          setMessages(data.data);
          setLoading(false);
    
          socket.emit("join chat", selectedChat._id);
        } catch (error) {
            console.log(error.message);
        }
      };

      const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
          socket.emit("stop typing", selectedChat._id);
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            setNewMessage("");
            const { data } = await axios.post(
                "/api/v1/message",
                {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                config
            );
            console.log("PrintingData",data);
            socket.emit("new message", data.data);
            setMessages([...messages, data.data]);
            setFetchAgain(!fetchAgain)
            // console.log(messages);
          } catch (error) {
           console.log(error.message);
          }
        }
    }

    useEffect(()=>{
      socket = io(ENDPOINT);
      socket.emit('setup',user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    },[])

      useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat
      }, [selectedChat]);
    
      useEffect(()=>{
        socket.on("message recieved", (newMessageRecieved) => {
          if (
            !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id
          ) {
            if (!notification.includes(newMessageRecieved)) {
              // dispatch(addNotification(notification));
              // setFetchAgain(!fetchAgain);
              //give notification
            }
          } else {
            setMessages([...messages, newMessageRecieved]);
          }
        });
      })

      const typingHandler = (e) => {
        setNewMessage(e.target.value);
    
        if (!socketConnected) return;
    
        if (!typing) {
          setTyping(true);
          socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);
      };

  return (
        <>
        {selectedChat ? (
            <div className="flex flex-col w-full h-[650px] ">
                <div className="text-xl px-3 py-2 flex justify-between items-center">
                    {
                        messages && (
                            <>
                            <div className='flex gap-x-3 items-center'><img src={getSenderFull(user,selectedChat.users)?.image ? getSenderFull(user,selectedChat.users)?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${getSenderFull(user, selectedChat.users).firstName} ${getSenderFull(user, selectedChat.users).lastName }` } alt="" className='h-[40px] w-[40px] rounded-full ' />
                                {getSenderFull(user, selectedChat.users).firstName+" "+getSenderFull(user, selectedChat.users).lastName}</div>
                                <ProfileModal 
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                            </>
                        )
                    }
                </div>
                <div   className="flex-1 p-3 bg-[#ECE5DD] overflow-y-scroll">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ScrollableChat messages={messages} />
                    )}
                </div>
                <div className=" bottom-0 w-full px-2">
                    {istyping ? (
                        <div>
                        <Lottie
                          options={defaultOptions}
                          // height={50}
                          width={70}
                          style={{ marginBottom: 15, marginLeft: 0 }}
                        />
                      </div>
                    ) : (
                        <></>
                    )}
                    <input
                        type="text"
                        onKeyDown={sendMessage}
                        className=" w-full p-2 outline-none rounded"
                        value={newMessage}
                        onChange={typingHandler}
                        placeholder="Enter A Message"
                    />
                </div>
            </div>
        ) : (
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-2xl font-sans">
                    Please Select A Chat
                </p>
            </div>
        )}
    </>
  )
}

export default SingleChat
