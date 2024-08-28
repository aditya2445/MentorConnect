import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
import chatReducer from "../slice/chatSlice"

const rootReducer =  combineReducers ({
    auth:authReducer,
    profile:profileReducer,
    chat:chatReducer,
})

export default rootReducer