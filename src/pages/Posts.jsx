import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const {user} = useSelector(state=>state.profile);
  const {token} = useSelector(state=>state.auth);
  const [posts,setPosts] = useState([]);
  const navigate = useNavigate();
  const fetchposts = async()=>{
    try {
        const config = {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }
        const {data} = await axios.get("/api/v1/post/",config);
        setPosts(data.data);
    } catch (error) {
        console.error(error.message);
    }
}

useEffect(()=>{
  // setLoggedUser(user);
  fetchposts();
})


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {posts?.map((p) => (
    <div
      key={p._id}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.title}</h3>
        <p className="text-gray-600 mb-4">{p.content.length > 80 ? `${p.content.substring(0, 80)}...` : p.content}</p>
        <p className="text-gray-500 text-sm">By {p.owner.firstName}</p>
      </div>
      <div className="bg-gray-100 p-4 text-right">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={()=>navigate(`${p._id}`)}
        >
          See Post
        </button>
      </div>
    </div>
  ))}
</div>

  )
}

export default Posts
