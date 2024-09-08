import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import rect1 from '../assets/Rectangle 13.png'
import rect2 from '../assets/Rectangle 14.png'
import section from '../assets/Section Img.png'
import { aboutUs } from '../data/AboutUs'
import Footer from '../components/Footer'


const AboutUs = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex flex-col gap-[200px] items-center justify-center '>
        <div className='w-10/12  flex flex-col items-center gap-y-32 mt-24 px-2 py-3'>
        {/* Section 1 */}
        <div className='flex justify-between lg:h-[552px] w-full '>
            <div className='lg:w-[45%] h-[532px] gap-y-5 flex flex-col items-start justify-evenly flex-wrap'>
                <h1 className='text-[40px] font-bold'>About Us</h1>
                <p className='text-[32px] font-semibold'><span className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>MentorMinds</span> providing the best opportunities to the students around the glob.</p>
                <p><i>Weekend UX, is a UI/UX Design Academy in Delhi involved in User Experience and User Interface Training and Consulting. It was started in 2023 and passionate towards User Interface Design/ User Experience Design, Human Computer Interaction Design. Humanoid is gushing towards competence to acquire knowledge and have a wide understanding towards the sphere through the foremost courses in the area of UI/UX Design, by strengthening up your skills, for your golden future</i></p>
                <div className='flex items-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-2 rounded-md font-bold gap-x-2 text-white'>Join Us <FaArrowRight /></div>
            </div>
            <div className='lg:w-[45%] flex-col z-20 '>
                
               <div className='h-[478px] w-[478px] rounded-md relative bg-[#F2F2F2]'> <img src={rect1} alt='' className='absolute top-[-5%] right-[-7%]'/>
               <img src={rect2} alt='' className=' absolute bottom-[-5%] left-[-7%]'/></div>


            </div>
        </div>
        {/* Section 2 */}
        <div className='flex flex-row-reverse justify-between lg:h-[552px] w-full '>
            <div className='lg:w-[45%] h-[532px] gap-y-5 flex flex-col items-start justify-evenly flex-wrap'>
                <h1 className='text-[36px] font-bold'>Features</h1>
                <p className='text-[32px] font-semibold'>We are always working <br/> to provide you best of   the features in all  aspects.</p>
                 <p><i>At WEEKENDUX the chief determination is to clear the minds of our students about their goals, while making them consistent in their ambitions and pushing them to be confident for their journey towards the course of time.</i></p>
                 <p><i>You will find every little thing on the internet in just a click of hand, but here we admire that without knowledge and practice the internet may even also fail you in your life.</i></p>
                <div className='flex items-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-2 rounded-md font-bold gap-x-2 text-white'>Learn More <FaArrowRight /></div>
            </div>
            <div className='lg:w-[45%] flex-col z-20 '>
                
               <div className='h-[478px] w-[478px] rounded-md relative bg-[#F2F2F2]'> <img src={section} alt='' className='absolute top-[10%] left-[5%]'/></div>


            </div>
        </div>
        {/* Section 3 */}
        <div className='flex flex-col items-center gap-y-3'>
            <h1 className='text-[36px] font-bold'>Our Benefits</h1>
            <p className='text-[28px] font-semibold'>By Joining WEEKENS UX Platform, One Can Avail a Lot Of Benefits.</p>
            <div className='grid gap-5 rounded-md grid-cols-3 mt-10'>
              {
               aboutUs.map((item,index)=>{
                return <div key={index} className='hover:scale-110 transition-all duration-200 flex bg-[#f0f7f2]   gap-y-2 flex-col rounded-md p-3 h-[236px] w-[376px] items-start'>
                    <img src={item.image} alt=''/>
                    <p className='text-xl font-bold'>{item.title}</p>
                    <p><i>{item.desc}</i></p>
                </div>
               })
              }
            </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutUs
