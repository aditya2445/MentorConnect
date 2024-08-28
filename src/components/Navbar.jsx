import React from 'react'
import { logOut } from '../services/operations/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = async()=>{
     dispatch(logOut(navigate));
  }
  const {user} = useSelector(state=>state.profile)
  const {token} = useSelector(state=>state.auth)
  return (
    <div className='h-[60px] w-full border-b-[1px] flex justify-between items-center px-10'>
      <div>logo</div>  
      {
        token && user && <div className='flex gap-x-3'>
          <button onClick={()=>navigate('/apply-mentor')} className='border-[1px] text-white rounded-md p-2 bg-emerald-700 font-bold'>Become A Mentor</button>
          <button onClick={logoutHandler} className='border-[1px] rounded-md p-2 font-bold'>Log Out</button>
          {/* profile dropdown to be added */}
        </div>
      }
      {
        !token && !user && <div className='flex gap-x-3'>
          <button onClick={()=>navigate('/login')} className='border-[1px] rounded-md p-2 font-bold'>Log In</button>
          <button onClick={()=>navigate('/signup')} className='border-[1px] rounded-md p-2 font-bold'>Sign Up</button>
        </div>
      }
    </div>
  )
}

export default Navbar