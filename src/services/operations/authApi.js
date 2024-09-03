import toast from 'react-hot-toast'
import {auth} from '../apis'
import { setLoading,setToken } from '../../slice/authSlice'
import { apiConnector } from '../apiConnector'
import { setUser } from '../../slice/profileSlice'

const {SIGNUP_API,LOGIN_API,SENDOTP_API,GET_USER_DETAILS,CONTACT_US_API} = auth

export function sendOtp(email,navigate){
 return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector ("POST",SENDOTP_API,{email})
        toast.success("OTP Sent Successfully")
        navigate("/verifyEmail")
      } catch (error) {
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
 }
}

export function signup(data,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            console.log("into")
            const response = await apiConnector("POST",SIGNUP_API,data)
            console.log(response)
            if(!response.data.success){
              throw new Error(response.data.message)
            }
            toast.success("Sign Up Successful")
            navigate("/login")
          } catch (error) {
            toast.error("Signup Failed")
            navigate("/signup")
          }
          dispatch(setLoading(false))
          toast.dismiss(toastId)
            
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",LOGIN_API,{email,password});
            if(!response?.data?.success){
              throw new Error("Error occured during login");
            }
            toast.success("Login Successfull")
          
            dispatch(setToken(response?.data?.user?.token))
            const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.user?.firstName} ${response?.data?.user?.lastName }`
            dispatch(setUser({ ...response?.data?.user, image: userImage }))
          
            localStorage.setItem("token", JSON.stringify(response?.data?.user?.token))
                localStorage.setItem("user", JSON.stringify({ ...response?.data?.user, image: userImage }))
          
           navigate('/')
          } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("login failed")
          }
          dispatch(setLoading(false))
    }
}

export function logOut(navigate){
  return async(dispatch)=>{
   dispatch(setLoading(true))
   dispatch(setUser(null))
   dispatch(setToken(null))
   localStorage.removeItem("token")
   localStorage.removeItem("user")
   toast.success("logout successful")
   navigate("/")
   dispatch(setLoading(false))
  }
}

export async function getUserDetails(token){
  let res;
  try {
    const response = await apiConnector("GET",GET_USER_DETAILS,null,{
      Authorization : `Bearer ${token}`
    })
    if(!response?.data?.success){
      throw new Error("user details unavailable")
    }
    res = response?.data?.data
  } catch (error) {
    console.log("unable to fetch details")
  }
  return res;
}

export async function contactUs(data){
  const toastId = toast.loading("submitting...")
  try {
    const res = await apiConnector("POST",CONTACT_US_API,data);
    if(!res?.data?.success){
      throw new Error("submission failed")
    }
    toast.success("form Submitted")
  } catch (error) {
    console.log("unable to submit the form")
    toast.error("unable to submit the form")
  }
  toast.dismiss(toastId)
}

