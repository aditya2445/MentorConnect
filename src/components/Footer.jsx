import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-teal-700 flex text-white items-center justify-center h-[504px] w-full'>
        <div className='flex w-10/12 items-center justify-between'>
            <div className='w-[40%] flex flex-col items-start gap-y-5'>
                <p className='text-[28px] font-bold'>E-Learn</p>
                <p className='text-[18px]'>Venture customer niche market <br/> adopters monetization.</p>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-[16px]'>Follow us</p>
                    <div className='flex gap-x-2 text-2xl'> <FaWhatsapp className='text-green-500'/> <FaTwitter className='text-sky-500'/> <FaInstagram className='text-pink-500'/> </div>
                </div>
            </div>
            <div  className='w-[40%] justify-evenly items-center flex'>
                <div className='flex items-center flex-col gap-y-3'><p className='text-lg font-semibold'>Company</p><p>About Us</p> <p>Careers</p> <p>Press Kit</p></div>
                <div className='flex items-center flex-col gap-y-3'><p className='text-lg font-semibold'>Resource</p><p>Blog</p> <p>Help Center</p> <p>Ux Research</p></div>
                <div className='flex items-center flex-col gap-y-3'><p className='text-lg font-semibold'>Product</p><p>Pricing</p> <p>Enterprise</p> <p>Integrate</p></div>
            </div>
            <div className='w-[20%] items-center flex flex-col gap-y-3 border-l-[1px] justify-center'>
                    <p>Mentor Recommendations</p>
                    <p>Schedule Meetings</p>
                    <p>Interview Preparation</p>
                    <p>Top Guidance</p>

            </div>
            
        </div>
    </div>
  )
}

export default Footer