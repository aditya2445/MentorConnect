import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from "../miscellaneous/UserListItem"
import { setChats, setSelectedChat } from '../../../slice/chatSlice';

function SearchBar({onSearch}) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {user} = useSelector(state=>state.profile);
  const {chats} = useSelector(state=>state.chat);
  const {token} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const [onClose,setOnClose] = useState(false);
  const searchref = useRef()
  const handleSearch = async()=>{
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/v1/auth?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    const clickHandler = (event)=>{
    if(!searchref.current.contains(event.target)) setSearch("")
      }
      document.addEventListener("mousedown",clickHandler)
     return ()=>{
      document.removeEventListener("mousedown",clickHandler)
     }
    })


  const accessChat = async (userId) => {
    console.log("accesschat",userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`/api/v1/chat`, { userId }, config);
      console.log("access chat",data.data);
      
      if (!chats.find((c) => c._id === data.data._id)) dispatch(setChats([data.data, ...chats]));
      dispatch(setSelectedChat(data.users));
      setLoadingChat(false);
      setSearchResult([]);
      setSearch("");
      setOnClose(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex justify-start flex-wrap relative  w-full'>
    <div className='flex w-full justify-between gap-3'>
    <form className='w-full'>
        <input
            type="text"
            placeholder='Search by user or email'
            value={search}
            onChange={(e)=>{setSearch(e.target.value)
              handleSearch()
            }}
            className='p-2 text-sm w-full border-black outline-none border-[1px] rounded-lg text-black'
        />
      </form>
    </div>
        { search ?
          <div ref={searchref} style={{scrollbarWidth:'none'}} className={`absolute bg-white p-2 border-[1px] rounded-md left-2 top-10 ${searchResult.length>0 && !loading ? "h-max-[200px]" : "h-[40px]"} overflow-y-scroll`}>
          {
            loading?(<p className='bg-white  rounded-md'>Loading...</p>):(!searchResult.length>0 ? <div className='w-full flex items-center justify-center'>No Users Found</div> :searchResult?.map((user)=>(
              <div key={user._id}>
              <UserListItem
              user={user}
              handleFunction = {()=>accessChat(user._id)}
              />
              </div>
            ))
          )}
        </div> : <div></div>}
        </div>
  )
}

export default SearchBar
