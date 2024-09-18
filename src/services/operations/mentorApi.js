import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { mentor } from "../apis";

const {MENTOR_APP_API,CHECK_MENTOR_API,FETCH_MENTORS_API,GET_ALL_APPS,ACCEPT_MENTOR,REJECT_MENTOR,TOP_MENTOR} = mentor
export async function createMentorApp(data,token) {
    let res;
   try {
     const response = await apiConnector("POST",MENTOR_APP_API,data,{
         Authorization : `Bearer ${token}`
     })
     if(!response?.data?.success){
         throw new Error("submission of application failed")
     }
     toast.success("Application Submitted")
     res = response?.data?.data
   } catch (error) {
     console.log("unable to submit application at the moment")
   }
 return res
}

export async function checkMentorApp(token) {
     let res;
     try {
        const response = await apiConnector("GET",CHECK_MENTOR_API,null,{
             Authorization : `Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("unable to fetch application at the moment")
        }
        toast.success("Application fetched")
        res = response?.data?.data
     } catch (error) {
        console.log("unable to fetch application at the moment")
     }
     return res;
}

export async function fetchMentors(token) {
  let res;
  try {
      const response = await apiConnector("GET",FETCH_MENTORS_API,null,{
          Authorization:`Bearer ${token}`
      })
      if(response)console.log(response)
      if(!response?.data?.success){
          throw new Error("Mentor fetching failed")
      }
      res = response?.data?.data
  } catch (error) {
      console.log("unable to fetch mentors")
  }
  return res
}

export async function getAllMentorsApp(token) {
    let res;
    try {
        const response = await apiConnector("GET",GET_ALL_APPS,null,{
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("Unable to fetch all applications")
        }
        res = response?.data?.data
    } catch (error) {
        console.log("something went wrong while fetching applications")
    }
    return res;
}
export async function AcceptMentor(data,token){
    try {
        const response = await apiConnector("POST",ACCEPT_MENTOR,data,{
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("Unable to accept mentor")
        }
        toast.success("Mentor Application Accepted Successfully")
    } catch (error) {
        console.log("something went wrong while accepting mentor application")
    }
}

export async function RejectMentor(data,token){
    try {
        const response = await apiConnector("POST",REJECT_MENTOR,{data},{
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success){
            throw new Error("Unable to reject mentor")
        }
        toast.success("Mentor Application Rejected Successfully")
    } catch (error) {
        console.log("something went wrong while rejecting mentor application")
    }
}

export async function topMentors() {
    let res;
    try {
        const response = await apiConnector("GET",TOP_MENTOR)
        if(!response?.data?.success){
            throw new Error("Mentor fetching failed")
        }
        res = response?.data?.data
    } catch (error) {
        console.log("unable to fetch mentors")
    }
    return res
  }
