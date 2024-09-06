import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {session} from '../apis'

const {CREATE_TIME_SLOTS,GET_TIME_SLOTS,BOOK_SESSION,ALL_SESSION,TIME_UPDATES,SESSION_REQUESTS,ACCEPT_REQ,REJECT_REQ} = session


export async function createTimeSlots(data,token) {
    try {
        const res = await apiConnector("POST",CREATE_TIME_SLOTS,data,{
            Authorization:`Bearer ${token}`
        })
        if(!res?.data?.success){
            throw new Error("time slot creation failed")
        }
        toast.success("Time Slot added")
    } catch (error) {
        toast.error("unable to create time slot")
    }
}

export async function getTimeSlots(userId) {
    let res ;
    try {
        const response = await  apiConnector("POST",GET_TIME_SLOTS,{userId})
     
        if(!response?.data?.success){
            throw new Error("someting went wrong while fetching the time slots")
        }
        res=response?.data?.data
    } catch (error) {
        console.log("Unable to fetch data")
    }
    return res;
}

export async function bookSession(data,token) {
    const toastId = toast.loading("Booking...")
    try {
        const response = await  apiConnector("POST",BOOK_SESSION,data,{
            Authorization:`Bearer ${token}`
        })
      if(response)console.log(response)
        if(!response?.data?.success){
            throw new Error("someting went wrong while booking a session")
        }
       toast.success(response?.data?.message)
    } catch (error) {
        console.log("Unable to book a session")
    }
toast.dismiss(toastId)
}

export async function getAllSessions(token) {
    let res;
    try {
        const response = await  apiConnector("GET",ALL_SESSION,null,{
            Authorization:`Bearer ${token}`
        })
     
        if(!response?.data?.success){
            throw new Error("someting went wrong while fetching the sessions")
        }
        res= response?.data?.data
    } catch (error) {
        console.log("Unable to fetch the sessions")
    } 
    return res;
}

export async function timeUpdates(data) {

    try {
        console.log(data)
        const response = await apiConnector("POST",TIME_UPDATES,data)
        if(response)console.log(response)
        if(!response?.data?.success){
            throw new Error("someting went wrong while updating time ")
        }
      
    } catch (error) {
        console.log("Unable to updating")
    } 
   
}

export async function getSessionRequests(token) {
    let res;
    try {
        const response = await apiConnector("POST",SESSION_REQUESTS,null,{
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("someting went wrong while fetching the sessions")
        }
        res= response?.data?.data
    } catch (error) {
        console.log("Unable to fetch the sessions")
    } 
    return res;
}

export async function AcceptRequest(token,data) {

    try {
        const response = await apiConnector("POST",ACCEPT_REQ,{data},{
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("someting went wrong while accepting the req")
        }
 
    } catch (error) {
        console.log("Unable to accept the req")
    } 
    
}

export async function RejectRequest(token,data) {

    try {
        const response = await apiConnector("POST",REJECT_REQ,{data},{
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("someting went wrong while rejecting the req")
        }
 
    } catch (error) {
        console.log("Unable to reject the req")
    } 
    
}

