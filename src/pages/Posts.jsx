// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';

// // function Posts() {
// //   const {user} = useSelector(state=>state.profile);
// //   const {token} = useSelector(state=>state.auth);
// //   const [posts,setPosts] = useState([]);
// //   const navigate = useNavigate();
// //   const fetchposts = async()=>{
// //     try {
// //         const config = {
// //             headers:{
// //                 Authorization:Bearer ${token},
// //             },
// //         }
// //         const {data} = await axios.get("/api/v1/post/",config);
// //         setPosts(data.data);
// //     } catch (error) {
// //         console.error(error.message);
// //     }
// // }

// // useEffect(()=>{
// //   // setLoggedUser(user);
// //   fetchposts();
// // })


// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
// //   {posts?.map((p) => (
// //     <div
// //       key={p?._id}
// //       className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
// //     >
// //       <div className="p-6">
// //         <h3 className="text-lg font-semibold text-gray-800 mb-2">{p?.title}</h3>
// //         <p className="text-gray-600 mb-4">{p?.content?.length > 80 ? ${p?.content?.substring(0, 80)}... : p?.content}</p>
// //         <p className="text-gray-500 text-sm">By {p?.owner?.firstName}</p>
// //       </div>
// //       <div className="bg-gray-100 p-4 text-right">
// //         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         onClick={()=>navigate(${p?._id})}
// //         >
// //           See Post
// //         </button>
// //       </div>
// //     </div>
// //   ))}
// // </div>

// //   )
// // }

// // export default Posts

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa'; // Icons for interactions

// function Posts() {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();
//   const likesCount = 0;
//   // console.log("Post User",user);

//   const fetchposts = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: Bearer ${token},
//         },
//       };
//       const { data } = await axios.get('/api/v1/post/', config);
//       setPosts(data.data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchposts();
//   }, []);

//   return (
//     <div className="flex flex-col w-6/12 m-auto gap-5 p-6 relative">
//       <div className='p-5 min-h-[5%] w-[20%] fixed left-[4%] flex flex-col items-center gap-3 font-serif rounded-lg shadow-lg hidden lg:flex lg:flex-col lg:items-center lg:gap-3 lg:font-serif lg:rounded-lg lg:shadow-lg'>
//       <img src={user?.image} alt="User Avatar" className='w-24 h-24 rounded-full' />
//       <p className='text-xl font-semibold'>Name: {user?.firstName} {user?.lastName}</p>
//       <p>"A passionate individual with a love for technology and creativity, constantly exploring new ways to blend the two. With a background in web development, particularly focused on front-end technologies like React. In their free time, they enjoy photography and exploring new places."</p>
//       <button className='bg-green-400 rounded-lg p-3 w-full' onClick={() => navigate('/myposts')}>My Posts</button>
//     </div>
//       {posts?.map((p,i) => (
//         <div
//           key={p?._id}
//           className="bg-white shadow-lg rounded-lg overflow-hidden "
//           onClick={() => navigate(${p?._id})}
//         >
//           {/* Header Section */}
//           <div className="flex items-center gap-x-3 p-4">
//             <img
//               src={p?.owner?.image || https://api.dicebear.com/5.x/initials/svg?seed=${p?.owner?.firstName} ${p?.owner?.lastName }}
//               alt="User Profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div>
//               <h3 className="font-semibold text-gray-900">{p?.owner?.firstName} {p?.owner?.lastName}</h3>
//               <p className="text-sm text-gray-500">{new Date(p?.createdAt).toLocaleTimeString()}</p>
//             </div>
//           </div>

//           {/* Media Section (Video/Image or Content) */}
//             <div className="p-3 flex flex-col items-start">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{p?.title}</h3>
//               <p className="text-gray-600 mb-4">
//                 {p?.content?.length > 80 ? ${p?.content?.substring(0, 80)}... : p?.content}
//               </p>
//             </div>
//           {p?.image && <img src={p?.image} alt="Post Media" className="w-full h-[300px] object-cover p-4" />}
//           {/* Tags Section */}
//           {p?.tags?.length > 0 && (
//             <div className="p-4">
//               <div className="mt-3 text-blue-500 text-sm">
//                 {p.tags.map((tag, index) => (
//                   <span key={index} className="mr-2">#{tag}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Interaction Buttons (Like, Comment, Retweet) */}
//           {/* {a=Math.floor(Math.random()*350+i)} */}
//           <div className="flex items-center justify-between p-4">
//             <div className="flex gap-x-4">
//               <button className="flex items-center gap-x-1 text-gray-500 hover:text-red-500">
//                 <FaHeart color='red' />
//                 <span>{p?.likesCount || Math.floor(Math.random()*350+i)}</span>
//               </button>
//               <button className="flex items-center gap-x-1 text-gray-500 hover:text-blue-500">
//                 <FaComment color='blue'/>
//                 <span>{p?.commentsCount || Math.floor(Math.random()350(i+1))}</span>
//               </button>
//             </div>
//             {p?.mediaType === 'video' && (
//               <div className="text-sm text-gray-500">
//                 <span>{p?.duration || '1:20'}</span>
//               </div>
//             )}
//           </div>

//           {/* See Post Button */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Posts;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaRetweet } from 'react-icons/fa'; // Icons for interactions

function Posts() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchposts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('/api/v1/post/', config);
      setPosts(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchposts();
  }, []);

  return (
    <div className="flex w-full p-6 relative">
      {/* Left Sidebar (User Info, Stats, and Actions) */}
      <div className="w-[20%] fixed left-[4%] top-[10%] flex flex-col items-center gap-3 font-serif rounded-lg shadow-lg p-4 hidden lg:flex lg:flex-col lg:items-center lg:gap-5 lg:font-serif lg:rounded-lg lg:shadow-lg">
        <img src={user?.image} alt="User Avatar" className="w-24 h-24 rounded-full" />
        <p className="text-xl font-semibold">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-center text-sm">
          "A passionate individual with a love for technology and creativity, constantly exploring new ways to blend the two."
        </p>
        <button className="bg-green-400 rounded-lg p-3 w-full" onClick={() => navigate('/myposts')}>
          My Posts
        </button>

        {/* Stats Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Stats</h3>
          <p className="text-sm text-gray-600">Posts: {posts?.length}</p>
          <p className="text-sm text-gray-600">Followers: {user?.followersCount || Math.floor(Math.random() * 1000)}</p>
          <p className="text-sm text-gray-600">Following: {user?.followingCount || Math.floor(Math.random() * 100)}</p>
        </div>


        {/* Recent Interactions */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Recent Interactions</h3>
          <ul className="text-sm text-gray-600">
            <li>{user?.firstName} liked a post</li>
            <li>{user?.firstName} commented on a post</li>
            <li>{user?.firstName} shared a post</li>
          </ul>
        </div>
      </div>

      {/* Post Feed */}
      <div className="flex flex-col w-6/12 m-auto gap-5 p-6">
        {posts?.map((p, i) => (
          <div key={p?._id} className="bg-white shadow-lg rounded-lg overflow-hidden" onClick={() => navigate(`${p?._id}`)}>
            {/* Header Section */}
            <div className="flex items-center gap-x-3 p-4">
              <img
                src={p?.owner?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${p?.owner?.firstName} ${p?.owner?.lastName}`}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {p?.owner?.firstName} {p?.owner?.lastName}
                </h3>
                <p className="text-sm text-gray-500">{new Date(p?.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{p?.title}</h3>
              <p className="text-gray-600 mb-4">
                {p?.content?.length > 80 ?` ${p?.content?.substring(0, 80)}...` : p?.content}
              </p>
            </div>

            {/* Post Image */}
            {p?.image && <img src={p?.image} alt="Post Media" className="w-full h-[300px] object-cover p-4" />}

            {/* Tags Section */}
            {p?.tags?.length > 0 && (
              <div className="p-4">
                <div className="mt-3 text-blue-500 text-sm">
                  {p.tags.map((tag, index) => (
                    <span key={index} className="mr-2">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Interaction Buttons */}
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-x-4">
                <button className="flex items-center gap-x-1 text-gray-500 hover:text-red-500">
                  <FaHeart color="red" />
                  <span>{p?.likesCount || Math.floor(Math.random() * 350 + i)}</span>
                </button>
                <button className="flex items-center gap-x-1 text-gray-500 hover:text-blue-500">
                  <FaComment color="blue" />
                  <span>{p?.commentsCount || Math.floor(Math.random() * 350 * (i + 1))}</span>
                </button>
              </div>
              {p?.mediaType === 'video' && (
                <div className="text-sm text-gray-500">
                  <span>{p?.duration || '1:20'}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="w-[20%] fixed right-[4%] top-[10%] flex flex-col gap-5 font-serif rounded-lg shadow-lg p-5 lg:flex lg:flex-col lg:gap-5 lg:font-serif lg:rounded-lg lg:shadow-lg hidden">
        {/* Trending Posts */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Trending Posts</h3>
          <ul className="text-sm text-gray-600">
            <li>Post 1: A journey with React</li>
            <li>Post 2: JavaScript tips & tricks</li>
            <li>Post 3: Frontend Development</li>
          </ul>
        </div>

        {/* Friends Online */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Friends Online</h3>
          <div className="flex items-center gap-x-3">
            <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="Friend Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-gray-900">Sarah Doe</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 mt-3">
            <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Friend Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-gray-900">John Smith</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Recommended Courses</h3>
          <p className="text-sm text-gray-600">Level up your React skills with this new course!</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;