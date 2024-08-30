import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserDetails } from '../../../services/operations/authApi'
import star from '../../../assets/Stars.png'
import { SiSemanticscholar } from "react-icons/si";
import { IoIosPhotos } from "react-icons/io";
import wallpaper from '../../../assets/Wallpaper image.png'

const MenteeProfile = () => {
    const {user} = useSelector(state=>state.profile)
    const {token} = useSelector(state=>state.auth)
    const [profileDetails, setprofileDetails] = useState(null)
    const [loading, setloading] = useState(false)

    useEffect(()=>{
    const fetchUserDetails = async()=>{
    setloading(true)
    const res = await getUserDetails(token);
    if(res)setprofileDetails(res)
    setloading(false)
    }
    fetchUserDetails()
    },[])
    if(profileDetails)console.log(profileDetails)
  return (
    <div className='w-full flex items-center justify-center relative'>
        <img className='absolute top-[-70px] rounded-md w-[920px] h-[169px] z-10' src={wallpaper}/>
        {
            loading ?(<div className='h-[600px] flex items-center justify-center'><div className='spinner  '></div></div>) :
            (<div className='profile_div flex z-20  items-center gap-x-5 justify-between '>
                <div className='flex bg-white flex-col border-[1px] items-center rounded-[9px] lg:w-[350px] sm:w-[392px] lg:h-[560px] p-5 px-7 gap-y-5 '>
                    <div className='w-full h-[17%]'><img className='w-[89px] h-[89px] rounded-full object-cover' src={profileDetails?.image} alt=''/></div>
                    <fieldset className='flex flex-col gap-y-3 border-[1px] p-3 rounded-md w-full'>
                        <legend className='px-2 font-bold'> <i>Personal information</i> </legend>
                        <div className='flex flex-col'>
                            <p  className='font-semibold'>Name</p>
                            <p className='text-sm'>{profileDetails?.firstName + " " + profileDetails?.lastName}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p  className='font-semibold'>Email</p>
                            <p className='text-sm'>{profileDetails?.email}</p>
                        </div>
                        <div className='flex flex-col'>
                           <p  className='font-semibold'>Contact Number</p>
                           <p className='text-sm'>{profileDetails?.additionalDetails?.contactNumber}</p>
                            </div>
                           
                    </fieldset>

                  <fieldset className='flex flex-col w-full border-[1px] p-3 rounded-md h-[25%]'>
                  <legend className='px-2 font-bold'> <i>About {profileDetails?.firstName}</i></legend>

                        <p className='text-sm'>{profileDetails?.additionalDetails?.about}</p>
                    </fieldset>

                    <fieldset className='flex w-full flex-col border-[1px] p-3 rounded-md h-[18%]'>
                    <legend className='px-2 font-bold'><i>Acheivements</i> </legend>

                        <p className='text-sm'>{profileDetails?.additionalDetails?.achievements}</p>
                    </fieldset>
                

                </div>
                <div className='flex bg-white flex-col border-[1px] items-center gap-y-3 rounded-[9px] p-5 lg:w-[300px] lg:h-[560px]'>
                    <fieldset className='flex items-center w-full border-[1px] flex-wrap lg:flex-nowrap p-2  rounded-md'>
                        <legend className='px-2 font-bold'><i>Educational Details</i></legend>
                        <p className='text-sm'>This are the details shown to the Mentor</p>
                        <img className='h-[48px] lg:visible invisible w-[48px]' src={star} alt=''/>
                    </fieldset>
                   <fieldset className='flex items-center w-full border-[1px] p-2 rounded-md'>
                   <legend className='px-2 font-bold'><i>Currently pursuing</i></legend>
                   <p className='text-sm'>{profileDetails?.additionalDetails?.education?.currentlyPursuing ? profileDetails?.additionalDetails?.education?.currentlyPursuing : "No Details Found" }</p>
                   </fieldset>
                   <fieldset className='flex items-center w-full border-[1px] p-2 rounded-md'>
                   <legend className='px-2 font-bold'><i>College</i></legend>
                   <p className='text-sm'>{profileDetails?.additionalDetails?.education?.college ? profileDetails?.additionalDetails?.education?.college : "No Details Found"}</p>
                   </fieldset>
                   <fieldset className='flex items-center w-full border-[1px] p-2 rounded-md'>
                   <legend className='px-2 font-bold'><i>Skills</i></legend>
                    {
                        profileDetails?.skills ? (<div>{
                            JSON.parse(profileDetails?.Skills)?.map((skill,index)=>{
                                return <p key={index} className='text-sm'>{skill}</p>
                            })
                           }</div>) : (<p className='text-sm'>No skills found</p>)
                    }
                   </fieldset>
                   <p className='w-full text-left text-[16px] font-bold'><i>Projects</i></p>
                   <div className='flex items-center w-full border-[1px] pl-2 justify-between rounded-md'>
                   <p className='text-sm'>Tap to view</p>
                   <div className='h-[48px] lg:visible invisible flex items-center justify-center w-[48px] rounded-r-md bg-orange-300'><SiSemanticscholar className='w-5 font-bold text-white h-5'/></div>
                   </div>
                   <p className='w-full text-left text-[16px] font-bold'><i>Posts</i></p>
                   <div className='flex items-center w-full border-[1px] pl-2 justify-between rounded-md'>
                   <p className='text-sm'>Tap to view</p>
                   <div className='h-[48px] lg:visible invisible flex items-center justify-center w-[48px] rounded-r-md bg-lime-300'><IoIosPhotos className='w-5 text-white h-5'/></div>
                   </div>
                </div>
            </div>)
        }
    </div>
  )
}

export default MenteeProfile