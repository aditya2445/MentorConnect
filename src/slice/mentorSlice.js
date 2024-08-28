import { createSlice } from "@reduxjs/toolkit";

const initialState={
    step:1,
    mentor:null,
        mentorProfile:null,
               mentorExp:null,
               loading:false

}

const mentorSlice = createSlice({
    name:"mentor",
    initialState,
    reducers:{
        setStep:(state,action)=>{
            state.step=action.payload
        },
        setMentor:(state,action)=>{
            state.mentor=action.payload
        },
        setMentorProfile:(state,action)=>{
            state.mentorProfile=action.payload
        },
        setMentorExp:(state,action)=>{
            state.mentorExp=action.payload
        },
        setloading:(state,action)=>{
            state.loading=action.payload
        }
        
    }
})
export const {setMentor,setStep,setMentorProfile,setMentorExp,setloading} = mentorSlice.actions
export default mentorSlice.reducer