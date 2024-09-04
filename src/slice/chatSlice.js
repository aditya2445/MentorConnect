import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat:null,
    selectedPost:null,
    chats:null,
    notification:[],
    token:localStorage.getItem("token")?JSON.parse(localStorage
        .getItem("token")):null,
}
const chatSlice = createSlice({
    name:"chat",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        setSelectedPost(state,value){
            state.selectedPost=value.payload
        },
        setSelectedChat(state,value){
            state.selectedChat = value.payload;
        },
        setChats(state,value){
            state.chats = value.payload;
        },
        addNotification(state, action) {
            state.notification.push(action.payload);
        },
        removeNotification(state, action) {
            state.notification = state.notification.filter(
                (notif) => notif._id !== action.payload._id
            );
        },
        clearNotifications(state) {
            state.notification = [];
        },
    },
})

export const {setToken,setSelectedChat,setChats,addNotification,removeNotification,clearNotifications,setSelectedPost}=chatSlice.actions;
export default chatSlice.reducer; 