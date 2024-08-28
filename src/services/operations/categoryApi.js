import { apiConnector } from "../apiConnector";
import { category } from "../apis";

const {SHOW_ALL_CATEGORY_API} = category;

export async function showAllCategory(){
    let res;
 try {
    const response = await apiConnector("GET",SHOW_ALL_CATEGORY_API)
    if(!response?.data?.success){
        throw new Error("No Category Available")
    }
    res = response?.data?.data
 } catch (error) {
    console.log("unable to fetch the catgories")
 }
 return res;
}


