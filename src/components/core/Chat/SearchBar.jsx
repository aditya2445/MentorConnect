import axios from 'axios';
import React, { useState } from 'react'
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
  const handleSearch = async()=>{
    if(!search){
      alert("please enter Something in Search");
      return;
    }
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
      setOnClose(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex justify-start flex-wrap mt-1 mb-1 relative'>
      <form>
        <input
            type="text"
            placeholder='Search by user or email'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className='p-2 text-sm border border-black rounded-lg'
        />
      </form>
        <button type='submit' className='px-2 py-2 font-sans text-sm w-10 bg-green-400 min-w-fit rounded-md' onClick={handleSearch}>Search</button>
        <div className='absolute left-2 top-10'>
          {
            loading?(<p>Loading...</p>):(searchResult?.map((user)=>(
              <div key={user._id}>
              <UserListItem
              user={user}
              handleFunction = {()=>accessChat(user._id)}

              />
              </div>
            ))
          )}
        </div>
        </div>
  )
}

export default SearchBar
