import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { sendOtp, signup } from '../services/operations/authApi'

const VerifyEmail = () => {
    const {loading,signupData} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otp, setotp] = useState()
    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

    function handleOnSubmit(event){
        event.preventDefault();
     
        dispatch(signup({...signupData,otp},navigate));}
      
        
    
  return (
    <div className='flex items-center justify-center'>
        <div>
            {
               loading ? (<span class="loader"></span>) 
               : (
                 <div>
                   <h1 className=''>Verify Email</h1>
                   <p className=''>A verification code has been sent to you. Enter the code below</p>
                   <form onSubmit={handleOnSubmit}>
               <OTPInput value={otp}
               onChange={setotp}
               numInputs={6} 
               renderSeparator={<span>-</span>}
               renderInput={(props)=><input {...props}/>}/>
               <button  className='' type='submit'>Verify Email</button> 
            </form>
            <div>
            <div><Link to='/login'><p>Back To Login</p></Link></div>
            <button onClick={()=>dispatch(sendOtp(signupData.email))}>
                Resend Email
            </button>
            </div> 
            </div>)
            }
        </div>
    </div>
  )
}

export default VerifyEmail