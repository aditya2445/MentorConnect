import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
import mentorReducer from '../slice/mentorSlice'
import chatReducer from "../slice/chatSlice"
import  adminReducer from "../slice/adminSlice"

const rootReducer =  combineReducers ({
    auth:authReducer,
    profile:profileReducer,
    chat:chatReducer,
    mentor:mentorReducer,
    admin:adminReducer
})
export default rootReducer