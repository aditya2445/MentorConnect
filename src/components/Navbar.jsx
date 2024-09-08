import React from 'react'
import { logOut } from '../services/operations/authApi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "../assets/logo.png"
import { FaSeedling } from "react-icons/fa";


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const logoutHandler = async()=>{
     dispatch(logOut(navigate));
  }
  const {user} = useSelector(state=>state.profile)
  const {token} = useSelector(state=>state.auth)
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
        </div> 
      {
        token && user && <div className='flex gap-x-3'>{
          user?.accountType === "Mentee"  && <button onClick={()=>navigate('/apply-mentor')} className='border-[1px] text-white rounded-md p-2 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 font-bold'>Become A Mentor</button>}
          <div className='flex gap-x-2 group items-center'>
            <img src={user?.image} alt="" className='w-[35px] h-[35px] rounded-full'/>
            <MdKeyboardArrowDown className='text-xl'/>
            <div className='absolute group-hover:visible transition-all duration-200 invisible bg-white flex flex-col gap-y-2 divide-y-[1px] p-3 right-[2%] top-[100%] rounded-md border-[1px] items-center'>
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
    </div>
  )
}

export default Navbar