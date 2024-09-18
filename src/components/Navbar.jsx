import React, { useState } from 'react'
import { logOut } from '../services/operations/authApi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "../assets/logo.png"
import { FaSeedling } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import axios from 'axios';



const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandler = async()=>{
     dispatch(logOut(navigate));
  }
  const {user} = useSelector(state=>state.profile)
  const {token} = useSelector(state=>state.auth)
  const openModal = () => {
    setModalOpen(true);
    setSearchResults([]);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to close modal
  const closeModal = () => {setModalOpen(false);
    setSearchQuery("")
  }
  const clearModal = () => {setSearchResults([]);
    setSearchQuery("")
  }

  const handleSearchSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/openai",
        { prompt: searchQuery },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("data here is", data);
      setSearchResults(data.result ? data.result.split('||') : []); // Split by '||' if data.result exists
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false); // End loading
    }
  };
  return (
    <div className='flex  flex-col text-black  w-full relative z-30 items-center '>
    <div className='h-[60px]  flex justify-between items-center px-10 w-full'>
      <div onClick={()=>navigate("/")} className='flex text-black items-center gap-x-2 font-bold text-lg'><FaSeedling/> MentConnect</div> 
      <div className='flex gap-x-10 items-center justify-center font-semibold '>
        <div className={`cursor-default hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-transparent hover:bg-clip-text ${location.pathname === "/" ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text" : "text-black"}`}  onClick={()=>navigate("/")}>Home</div>
        <div className={`cursor-default hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-transparent hover:bg-clip-text ${location.pathname === "/mentors" ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text" : "text-black"}`} onClick={()=>navigate("/mentors")}>Mentors</div>
        <div className={`cursor-default hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-transparent hover:bg-clip-text ${location.pathname === "/about-us" ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text" : "text-black"}`} onClick={()=>navigate("/about-us")}>About Us</div>
        <div className={`cursor-default hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-transparent hover:bg-clip-text ${location.pathname === "/contact-us" ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text" : "text-black"}`} onClick={()=>navigate("/contact-us")}>Contact Us</div>
        <div className={`cursor-default hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-transparent hover:bg-clip-text ${location.pathname === "/posts" ? "bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text " : "text-black"}`} onClick={()=>navigate("/posts")}>Community</div>
        <div className={`flex items-center gap-2 cursor-pointer ${location.pathname === "/ai" ? "text-blue-600" : "text-black"} bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md`} onClick={openModal}>
          <BsStars/>
            AI
          </div>
        </div> 
      {
        token && user && <div className='flex gap-x-3'>{
          user?.accountType === "Mentee"  && <button onClick={()=>navigate('/apply-mentor')} className='border-[1px] text-white rounded-md p-2 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 font-bold'>Become A Mentor</button>}
          <div className='flex gap-x-2 group items-center'>
            <img src={user?.image} alt="" className='w-[35px] h-[35px] object-cover rounded-full'/>
            <MdKeyboardArrowDown className='text-xl'/>
            <div className='absolute group-hover:visible transition-all duration-200 invisible bg-white flex flex-col gap-y-2  p-3 right-[2%] top-[100%] rounded-md border-[1px] items-center'>
      <Link to={"/dashboard/my-profile"}>DashBoard</Link>
      <Link to={"/myposts"}>My Posts</Link>
      <Link onClick={logoutHandler}>Log Out</Link>

    </div>
          </div>
        </div>
      }
      {
        !token && !user && <div className='flex gap-x-3'>
          <button onClick={()=>navigate('/login')} className='border-[1px] hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-white transition-all duration-100 rounded-md p-2 font-bold'>Log In</button>
          <button onClick={()=>navigate('/signup')} className='border-[1px] rounded-md p-2 font-bold  hover:bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 hover:text-white transition-all duration-100'>Sign Up</button>
        </div>
      }
    </div>
    <div className='w-full h-[1px] bg-gradient-to-r from-white via-gray-400 to-white'></div>
    {/* Modal Implementation */}
    {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-[600px] h-[500px] flex flex-col'>
            <h2 className="text-xl font-bold mb-4">Ask AI</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 border-[1px] rounded-md mb-4"
            />

            {/* Search Results */}
            <div className='flex-grow mb-4 overflow-y-auto border p-2 rounded-md'>
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {/* Skeleton Loader */}
                  <div className="animate-pulse bg-gray-300 h-6 rounded-md mb-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 rounded-md mb-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 rounded-md mb-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 rounded-md mb-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 rounded-md mb-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 rounded-md mb-2"></div>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div key={index} className='border-b py-2'>{result}</div>
                ))
              ) : (
                <div className='text-gray-500'>No results found</div>
              )}
            </div>

            {/* Buttons */}
            <div className='flex justify-between'>
             
              
              <button onClick={clearModal} className="underline font-semibold">Clear</button>
              <button onClick={closeModal} className="underline font-semibold">Close</button>
              <button onClick={handleSearchSubmit} className="bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md">
                Ask AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar