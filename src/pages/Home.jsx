import React, { useEffect } from 'react'
import google from "../assets/google.webp"
import Amazon from "../assets/Amazon.webp"
import netflix from"../assets/netflix.webp"
import facebook from "../assets/facebook.webp"
import Microsoft from "../assets/Microsoft.webp"
import Group80 from "../assets/Group\ 80.png"
import s1 from "../assets/sachinImage1.png"
import s2 from "../assets/sachinImage\ 0.png"
import s3 from "../assets/sachinImage\ 2.png"
import v from "../assets/vector.png"
import Group106 from "../assets/Group\ 106.png"
import Group107 from "../assets/Group\ 1000004153\ \(1\).png"
import Group72 from "../assets/Group72.png"
import Group73 from "../assets/Group73.png"
import users2 from "../assets/users2.png"
import  Group124 from "../assets/Group\ 124.png"
import contact from "../assets/Group\ 1000004154.png"
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'



const Home = () => {
  const navigate = useNavigate()
  return (
  <div className='flex flex-col items-center w-full justify-center'>
    {/* Section 1 */}
   <div className='home w-full h-[655px]   flex items-center justify-center ' >
   <div className='flex w-10/12 h-full items-start'> <div className='w-[50%] flex flex-col items-start justify-evenly h-full'><h1 className='text-5xl leading-normal text-white'>Connect with experienced Mentors who have walked the path you are aiming for</h1>
    <p className='text-white text-[20px]'><i>a Solution for easy and flexible online learning,<br/> you can study anywhere through this platform</i></p>
    <button className='bg-[#D9D9ED] p-3 rounded-l-2xl rounded-b-2xl'>Kickstart First Your Call</button></div></div>
   </div>
   {/* Section 2 */}
   <div className='w-full border-b-[1px] h-[100px]   flex items-center justify-center '>
    <div className='w-10/12 flex items-center justify-around'>
    <img  className='w-[150px] h-[60px] object-cover' src={google} alt=''/>
    <img  className='w-[150px] h-[60px] object-scale-down bg-black' src={Amazon} alt=''/>
    <img  className='w-[150px] h-[60px] object-cover' src={netflix} alt=''/>
    <img  className='w-[150px] h-[60px] object-scale-down' src={facebook} alt=''/>
    <img  className='w-[150px] h-[60px] object-fit' src={Microsoft} alt=''/>
    </div>
   </div>
   {/* Section 3 */}
   <div className='w-10/12 flex flex-col items-center mt-24  justify-center gap-y-5 '>
   <h1 className='text-4xl font-bold'>All-In-One <span className='text-teal-500'>Mentorship Platform</span></h1>
   <p className='text-[24px] text-center'><span className='text-teal-500'>MentConnect</span> is a dynamic web platform built for mentorship of <br/> Undergraduates,Enterpreneurs and Freelancers</p>
   <div className='flex items-center w-full justify-evenly mt-10'>
    <div className='flex flex-col w-[300px] rounded-md relative h-[320px] shadow-2xl  items-center justify-center p-5 gap-y-5'>
    <img src={Group80} alt="" className='w-[130px] top-[-15%] h-[130px] absolute' />
      <p className='text-2xl font-semibold text-center'>Networking and Job Referrals</p>
      <p className='text-center'>Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts</p>
    </div>
    <div className='flex flex-col rounded-md relative  shadow-2xl w-[300px] h-[320px] items-center justify-center p-5 gap-y-5'>
    <img src={Group80} alt="" className='w-[130px] top-[-15%] h-[130px] absolute' />
      <p className='text-2xl font-semibold text-center'>Networking and Job Referrals</p>
      <p className='text-center'>Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts</p>
    </div><div className='flex rounded-md flex-col relative shadow-2xl w-[300px] h-[320px] items-center justify-center p-5  gap-y-5 '>
      <img src={Group80} alt="" className='w-[130px] top-[-15%] h-[130px] absolute' />
      <p className='text-2xl font-semibold text-center'>Networking and Job Referrals</p>
      <p className='text-center'>Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts</p>
    </div> 

   </div>
   </div>
   {/* Section 4 */}
   <div className='w-10/12 flex flex-col gap-y-5 mt-24 items-center justify-center'>
   <h1 className='text-4xl font-bold'>What is <span className='text-teal-500'>MentConnect?</span> </h1>
   <p className='text-[22px] text-center'><span className='text-teal-500 '>MentConnect</span> is a web platform that connects mentees with industry mentors for <br/> personalized career guidance, skill development, and job referrals. </p>
   <div className='flex items-center justify-evenly w-full mt-10'>
    <div className='w-[350px] h-[250px] border-[1px]'></div>
    <div className='w-[350px] h-[250px] border-[1px]'></div>
   </div>
   </div>
   {/* Section 4 */}
   <div className='w-10/12 flex flex-col items-center mt-24  justify-center gap-y-5 '>
   <h1 className='text-4xl font-bold'>Discover Our <span className='text-teal-500'>Mentors</span></h1>
   <p className='text-[24px] text-center'>We have industry Experts as Mentor who guide you with <br/>  Career Planning & Interview Preparation</p>
   <div className='flex items-center w-full justify-evenly mt-10'>
    <div className='flex flex-col w-[350px] h-[430px] rounded-md  shadow-2xl  items-center justify-between p-5 '>
    <div><img src={s1} alt="" />
     <div className='flex items-center justify-between w-full'>
      <div className='text-xl font-bold'>Sachin Sharma</div>
      <img src={Microsoft} alt="" className='h-[40px] w-[120px] object-contain' />
     </div>
    <div className='flex items-start w-full'> <p><i>Managing Director</i></p></div></div>
    <div className='flex items-center w-full gap-x-3'>
      <img src={v} alt="" className='object-contain' /> <span>View Profile</span>
    </div>
    </div>
    <div className='flex flex-col w-[350px] h-[430px] rounded-md  shadow-2xl  items-center justify-between p-5 '>
    <div><img src={s2} alt="" />
     <div className='flex items-center justify-between w-full'>
      <div className='text-xl font-bold'>Sachin Sharma</div>
      <img src={Microsoft} alt="" className='h-[40px] w-[120px] object-contain' />
     </div>
    <div className='flex items-start w-full'> <p><i>Managing Director</i></p></div></div>
    <div className='flex items-center w-full gap-x-3'>
      <img src={v} alt="" className='object-contain' /> <span>View Profile</span>
    </div>
    </div>
    <div className='flex flex-col w-[350px] h-[430px] rounded-md  shadow-2xl  items-center justify-between p-5 '>
    <div><img src={s3} alt="" />
     <div className='flex items-center justify-between w-full'>
      <div className='text-xl font-bold'>Sachin Sharma</div>
      <img src={Microsoft} alt="" className='h-[40px] w-[120px] object-contain' />
     </div>
    <div className='flex items-start w-full'> <p><i>Managing Director</i></p></div></div>
    <div className='flex items-center w-full gap-x-3'>
      <img src={v} alt="" className='object-contain' /> <span>View Profile</span>
    </div>
    </div>
    

   </div>
   </div>
   {/* Section 5 */}
   <div className='w-10/12 flex flex-col items-center mt-24  justify-center gap-y-5'>
   <h1 className='text-4xl font-bold'>Our <span className='text-teal-500'>Features</span></h1>
   <p className='text-[22px]'>These extraordinary features can make learning activities more efficient</p>
   <div className='w-full flex items-center justify-evenly mt-5'>
    <img src={Group106} alt="" className='w-[45%]'/>
    <div className='flex items-start flex-col gap-y-5'>
      <p className='text-4xl font-bold'>One-on-One</p>
      <p className='text-teal-500 text-4xl font-bold'>MentorShip Sessions</p>
      <p className='text-2xl'>Teachers and teacher assistants can <br/> talk with students privately without<br/> leaving the Zoom environment.</p>
    </div>

   </div>
   <div className='w-full flex flex-row-reverse items-center justify-evenly mt-5'>
    <img src={Group107} alt="" className='w-[45%]'/>
    <div className='flex items-start flex-col gap-y-5'>
      <p className=' text-4xl font-bold'>A user <span className='text-teal-500'>friendly Video</span> Calling<br/> Feature for webinars</p>
       <div className='flex items-center justify-between mt-5 gap-x-10'>
        <img src={Group72} alt="" />
        <p className='text-2xl'>Teachers don’t get lost in the grid <br/> view and have a dedicated Podium space.
        </p>
       </div>
       <div className='flex items-center justify-between  mt-3 gap-x-10 ' >
       <img src={Group73} alt="" />
        <p className='text-2xl'>Embedded Chat Application for<br/> sharing of links and resources
        </p>
       </div>
       <div className='flex items-center justify-between  mt-3 gap-x-10'>
       <img src={users2} alt="" />
        <p className='text-2xl'>Teachers can easily see all students<br/> and class data at one time.
        </p>
       </div>
    </div>
   </div>
   <div className='w-full flex items-center justify-evenly mt-14'>
    <img src={Group124} alt="" className='w-[45%]'/>
    <div className='flex items-start flex-col gap-y-5'>
      <p className='text-teal-500 text-4xl font-bold'>Ratings and Levels<br/> system <span className='text-black'>for Mentees</span></p>
      <p className='text-2xl'>Class provides tools to help run and manage<br/> the class such as Class Roster, Attendance,<br/> and more. With the Gradebook, teachers can<br/> review and grade tests and quizzes in real-
      <br/>time.
      </p>
    </div>

   </div>
   </div>
   {/* Section 6 */}
   <div className='w-10/12 flex flex-col items-center mt-24  justify-center gap-y-5 '>
   <h1 className='text-4xl font-bold'>Explore Our Alumni & Connect With Them</h1>
   <div className='flex items-center w-full justify-evenly mt-10'>
    <div className='flex flex-col w-[350px] h-[360px] rounded-md  shadow-2xl justify-between  p-5 '>
    <div className='flex flex-col gap-y-3'><img src={s1} alt="" className='w-[60px] h-[60px] rounded-md' />
    <div><h1 className='text-2xl font-bold'>Sachin Sharma</h1>
    <p className='text-lg '><i>Software Engineer</i></p></div></div>
    <p>Apart from regular live classes, I was assigned with a Mentor someone from Microsoft and he guided me very well through out the course.</p>
    <div className='flex items-center gap-x-2'>
      <img src={v} alt="" />
      <p className='text-blue-600'>Read Full Review</p>
    </div>
    </div>
    <div className='flex flex-col w-[350px] h-[360px] rounded-md  shadow-2xl justify-between  p-5 '>
    <div className='flex flex-col gap-y-3'><img src={s2} alt="" className='w-[60px] h-[60px] rounded-md' />
    <div><h1 className='text-2xl font-bold'>Sachin Sharma</h1>
    <p className='text-lg '><i>Software Engineer</i></p></div></div>
    <p>Apart from regular live classes, I was assigned with a Mentor someone from Microsoft and he guided me very well through out the course.</p>
    <div className='flex items-center gap-x-2'>
      <img src={v} alt="" />
      <p className='text-blue-600'>Read Full Review</p>
    </div>
    </div>
    <div className='flex flex-col w-[350px] h-[360px] rounded-md  shadow-2xl justify-between  p-5 '>
    <div className='flex flex-col gap-y-3'><img src={s3} alt="" className='w-[60px] h-[60px] rounded-md' />
    <div><h1 className='text-2xl font-bold'>Sachin Sharma</h1>
    <p className='text-lg '><i>Software Engineer</i></p></div></div>
    <p>Apart from regular live classes, I was assigned with a Mentor someone from Microsoft and he guided me very well through out the course.</p>
    <div className='flex items-center gap-x-2'>
      <img src={v} alt="" />
      <p className='text-blue-600'>Read Full Review</p>
    </div>
    </div>
    
    

   </div>
   </div>
   {/* Section 6 */}
   <div className='w-10/12 mb-24 flex flex-col items-center mt-24  justify-center gap-y-5'>
  <div className='flex items-center w-full justify-evenly'>
    <div className='flex flex-col gap-y-5 '>
     <div className='flex flex-col gap-y-5'> <h1 className='text-4xl font-bold'>Enroll In Our Webinars<br/> & Improve Your Skill.</h1>
     <p className='text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Tincidunt amet sit placerat diam praesent pharetra at.<br/> Gravida ornare mauris pretium tortor, ac in nulla eleifend.</p></div>
     <div className='flex items-start mt-5'><button onClick={()=>navigate("/contact-us")} className='p-3 text-md rounded-b-2xl rounded-l-2xl text-white bg-teal-500'>Contact Us</button></div>
     <div className='flex items-center gap-x-5 mt-5'>
      <div className='flex flex-col border-l-2 p-3 gap-y-3'><p className='text-3xl font-bold'>586K+ <span className='text-xl'>students</span></p>
      <p className='text-[16px]'>Lorem upsum dolor sit amet,<br/> consectetur adipiscing elit.</p>
      </div>
      <div className='flex flex-col border-l-2 p-3 gap-y-3'><p className='text-3xl font-bold'>250+ <span className='text-xl'>Sessions</span></p>
      <p className='text-[16px]'>Lorem upsum dolor sit amet,<br/> consectetur adipiscing elit.</p></div>
     </div>
    </div>
    <img src={contact} alt="" className='w-[505px] h-[505px]' />
  </div>
   </div>
   {/* Section 7 */}
   <Footer/>
  </div>
  )
}

export default Home