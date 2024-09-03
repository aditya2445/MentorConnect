import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { mentor } from "../apis";

const {MENTOR_APP_API,CHECK_MENTOR_API,FETCH_MENTORS_API} = mentor
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

