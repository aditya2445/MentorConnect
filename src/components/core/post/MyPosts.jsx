import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {EditModal} from "./EditModal"
import { setSelectedPost } from '../../../slice/chatSlice';
import { IoMdAdd } from "react-icons/io";
import { AddPostModal } from './AddPostModal';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    const {token} = useSelector(state=>state.auth);
    const [activePostId, setActivePostId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const {selectedPost} = useSelector(state=>state.chat);
    const dispatch = useDispatch();
    const toggleMenu = (postId) => {
      setActivePostId(activePostId === postId ? null : postId);
    };
  
    const handleEdit = (post) => {
        console.log(post);
        dispatch(setSelectedPost(post));
        setIsEditModalOpen(true);
    };

    const handleAdd = ()=>{
      setIsAddModalOpen(true);
    }
  
    const handleDelete = async(postId) => {
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            await axios.delete(`http://localhost:3000/api/v1/post/delete/${postId}`, config);
            setPosts(posts.filter(post => post._id !== postId));
          } catch (error) {
            console.error(error.message);
          }
    };

    const handleSaveEdit = async (postId, updatedContent) => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.put(`/api/v1/post/update/${postId}`, { content: updatedContent }, config);
          setPosts(posts.map(post => post._id === postId ? { ...post, content: data.data.content } : post));
        } catch (error) {
          console.error(error.message);
        }
        // console.log("object");
      };

      const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]);
      };

      useEffect(() => {
        if (selectedPost) {
          console.log("Selected Post updated:", selectedPost); // This will log the updated selectedPost when it changes
        }
        setSelectedPost(selectedPost);
      }, [selectedPost]);

  useEffect(() => {
    // Fetch the post data from the backend
    const fetchPosts = async()=>{
        setLoading(true);
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
            const {data} = await axios.get(`/api/v1/post/myposts`,config);
            setPosts(data.data);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }
    fetchPosts();
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">My Posts</h1>
        <button 
        onClick={()=>handleAdd()}
        className='items-center flex gap-2 font-serif font-semibold bg-green-400 rounded-lg p-3'>
          Add Post
          <IoMdAdd />
          </button>
      </div>
    {posts.length > 0 ? (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="p-6 bg-gray-100 shadow-lg rounded-lg relative mt-2">
            <div className="flex items-center justify-between">
              <img 
                src={post.owner.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhGZO5vaTojUoZa1SkUFsqAz-TkNEgS4JAA&s"} 
                alt={post.owner.firstName} 
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <div className="relative">
                <button 
                  onClick={() => toggleMenu(post._id)} 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  &#x22EE;
                </button>
                {activePostId === post._id && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
                    <button 
                      onClick={() => handleEdit(post)} 
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(post._id)} 
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">
              {post.content.length > 80 ? `${post.content.substring(0, 80)}...` : post.content}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p>No posts available.</p>
    )}
    {
        selectedPost?(<EditModal 
            post={selectedPost} 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            onSave={handleSaveEdit} 
          />):(<></>)
    }
    <AddPostModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPost={handleAddPost}
      />
  </div>
  );
}

export default MyPosts;

// <div className="p-6 bg-gray-100 min-h-screen">
//   <h1 className="text-2xl font-bold mb-4">My Posts</h1>
//   {posts.length > 0 ? (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//       {posts.map((post) => (
//         <div key={post._id} className="p-6 bg-white shadow-lg rounded-lg">
//           <img 
//             src={post.owner.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhGZO5vaTojUoZa1SkUFsqAz-TkNEgS4JAA&s"} 
//             alt={post.owner.firstName} 
//             className="w-16 h-16 rounded-full object-cover mb-4"
//           />
//           <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//           <p className="text-gray-700 mb-4">
//             {post.content.length > 80 ? `${post.content.substring(0, 80)}...` : post.content}
//           </p>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p>No posts available.</p>
//   )}
// </div>