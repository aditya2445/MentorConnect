import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
<<<<<<< HEAD
import chatReducer from "../slice/chatSlice"

const rootReducer =  combineReducers ({
    auth:authReducer,
    profile:profileReducer,
    chat:chatReducer,
=======
import mentorReducer from '../slice/mentorSlice'
const rootReducer =  combineReducers ({
    auth:authReducer,
    profile:profileReducer,
    mentor:mentorReducer
>>>>>>> d86f17ddb991fb1c1ca12449fa13f858ccb2bfd6
})

export default rootReducer