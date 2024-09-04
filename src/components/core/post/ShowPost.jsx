import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function ShowPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State to store the post data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const {token} = useSelector(state=>state.auth); 
  useEffect(() => {
    // Fetch the post data from the backend
    const fetchPost = async()=>{
        setLoading(true);
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
            const {data} = await axios.get(`/api/v1/post/posts/${id}`,config);
            setPost(data.data);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }
    fetchPost();
  }, [id]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the post details if the post data is available
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-2 flex items-start space-x-4">
  {/* Profile Picture */}
  <img 
    src={post.owner.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhGZO5vaTojUoZa1SkUFsqAz-TkNEgS4JAA&s"} 
    alt={post.owner.firstName} 
    className="w-16 h-16 rounded-full object-cover"
  />
  
  {/* Post Content */}
  <div>
    <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
    <p className="text-gray-700 mb-4">{post?.content}</p>
    <p className="text-gray-500 text-sm">By {post?.owner?.firstName} {post?.owner?.lastName}</p>
  </div>
</div>

  );
}

export default ShowPost;
