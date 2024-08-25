import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { sendOtp, signup } from '../services/operations/authApi'
import {FaLongArrowAltLeft} from 'react-icons/fa'

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
    <div className='flex items-center justify-center h-screen w-full'>
        
    {
       loading ? (<span className="loader"></span>) 
       : (
         <div className='flex flex-col gap-y-3 lg:w-[30%] w-[40%] '>
           <h1 className='text-3xl font-bold'>Verify Email</h1>
           <p className='text-lg'>A verification code has been sent to you. Enter the code below</p>
           <form className='flex flex-col items-center justify-center gap-y-3 ' onSubmit={handleOnSubmit}>
       <OTPInput value={otp}
       onChange={setotp}
       numInputs={6} 
        containerStyle="otp-container"
        inputStyle={{
            width: '50px',
            height: '50px',
            margin: '0 5px',
            fontSize: '18px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
        }}
       renderInput={(props)=><input {...props}/>}
       />
       <button  className='bg-emerald-700 text-white font-bold w-full h-[40px] rounded-md' type='submit'>Verify Email</button> 
    </form>
    <div className='w-full flex items-center justify-between text-teal-500 font-semibold'>
    <div><Link to='/login'><p className='gap-2 flex items-center justify-center'><span className='text-lg text-center'><FaLongArrowAltLeft/></span>Back To Login</p></Link></div>
    <button onClick={()=>dispatch(sendOtp(signupData.email))}>
        Resend Email
    </button>
    </div> 
    </div>)
    }

</div>
  )
}

export default VerifyEmail