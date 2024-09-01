import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {session} from '../apis'

const {CREATE_TIME_SLOTS,GET_TIME_SLOTS} = session


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