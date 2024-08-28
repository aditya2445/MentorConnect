import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
import mentorReducer from '../slice/mentorSlice'
const rootReducer =  combineReducers ({
    auth:authReducer,
    profile:profileReducer,
    mentor:mentorReducer
})

export default rootReducer