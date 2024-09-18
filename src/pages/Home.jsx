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
import Group1 from '../assets/Group1.png'
import Group2 from '../assets/Group2.png'
import Group22 from '../assets/Group\ 22.png'
import student from '../assets/student.png'


const Home = () => {
  const navigate = useNavigate()
  return (
  <div className='flex flex-col items-center w-full justify-center'>
    {/* Section 1 */}
   <div className='w-10/12 h-[655px] flex items-center justify-center mb-14 '>
    <div className='w-[55%] mt-20 h-full flex flex-col justify-center gap-y-10  '>
      <h1 className='text-2xl font-bold'>Unlock Your Potential with <span className='font-bold  bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'> MentConnect,</span> <br/>Where Guidance Meets Growth</h1>
      <div class="animated-text font-bold text-4xl">
       <h1> We Provide You With</h1> <span className=''></span>
    </div>
    <div>
    <button onClick={()=>navigate("/login")} className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-white p-3 rounded-l-2xl rounded-b-2xl font-semibold'>Book Your Free Demo</button>

    </div>
      <div className='flex flex-col gap-y-5'>
      <p className='font-semibold'><i>Mentor Connect connects you with experienced mentors ,<br/> who can guide your personal and professional growth. Whether<br/> you're looking to learn new skills  or advance your career,<br/> our mentors are here to support your journey. Join today and<br/> unlock the power of mentorship.</i></p>
    
      </div>
    </div>
    <div className='w-[40%] h-full flex items-center justify-center relative'>
      <img src={Group1} alt="" className='object-contain' />
      <div className='absolute'><img src={Group2} alt="" /></div>
    </div>
   </div>
   {/* Section 2 */}
   <div className='w-full border-y-[1px] h-[100px]    flex items-center justify-center '>
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
   <h1 className='text-4xl font-bold'>All-In-One <span className=' bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>Mentorship Platform</span></h1>
   <p className='text-[24px] text-center'><span className=' bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>MentConnect</span> is a dynamic web platform built for mentorship of <br/> Undergraduates,Enterpreneurs and Freelancers</p>
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
   <h1 className='text-4xl font-bold'>What is <span className=' bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>MentConnect?</span> </h1>
   <p className='text-[22px] text-center'><span className=' bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>MentConnect</span> is a web platform that connects mentees with industry mentors for <br/> personalized career guidance, skill development, and job referrals. </p>
   <div className='flex items-center justify-evenly w-full mt-10'>
      <div className='relative group w-[450px] h-[350px] border-[1px] rounded-md overflow-hidden'>
        <img src={Group22} alt="Group 22" className='w-full h-full object-cover' />
        <div className='absolute inset-0 group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-700'></div>
        <div className='absolute inset-0 flex  flex-col gap-5 items-center justify-center transition-transform duration-700 transform translate-y-full group-hover:translate-y-0'>
        <p className='text-3xl font-bold text-white'>For Mentees</p>
          <button onClick={()=>navigate('/apply-mentor')} className='bg-transparent border-[1px] border-white text-white font-semibold py-3 px-4 rounded-3xl'>
          Become A Mentor
          </button>
        </div>
      </div>

      <div className='relative group w-[450px] h-[350px] border-[1px] rounded-md overflow-hidden'>
        <img src={student} alt="Student" className='w-full h-full object-cover' />
        <div className='absolute inset-0 group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-700'></div>
        <div className='absolute inset-0 flex flex-col gap-5 items-center justify-center transition-transform duration-700 transform translate-y-full group-hover:translate-y-0'>
          <p className='text-3xl font-bold text-white'>For Mentors</p>
          <button className='bg-transparent border-[1px] border-white text-white font-semibold py-3 px-4 rounded-3xl'>
           Book Demo
          </button>
        </div>
      </div>
    </div>
   </div>
   {/* Section 4 */}
   <div className='w-10/12 flex flex-col items-center mt-24  justify-center gap-y-5 '>
   <h1 className='text-4xl font-bold'>Discover Our <span className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>Mentors</span></h1>
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
   <h1 className='text-4xl font-bold'>Our <span className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>Features</span></h1>
   <p className='text-[22px]'>These extraordinary features can make learning activities more efficient</p>
   <div className='w-full flex items-center justify-evenly mt-5'>
    <img src={Group106} alt="" className='w-[45%]'/>
    <div className='flex items-start flex-col gap-y-5'>
      <p className='text-4xl font-bold'>One-on-One</p>
      <p className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text text-4xl font-bold'>MentorShip Sessions</p>
      <p className='text-2xl'>Teachers and teacher assistants can <br/> talk with students privately without<br/> leaving the Zoom environment.</p>
    </div>

   </div>
   <div className='w-full flex flex-row-reverse items-center justify-evenly mt-5'>
    <img src={Group107} alt="" className='w-[45%]'/>
    <div className='flex items-start flex-col gap-y-5'>
      <p className=' text-4xl font-bold'>A user <span className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text'>friendly Video</span> Calling<br/> Feature for webinars</p>
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
      <p className='bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text text-4xl font-bold'>Ratings and Levels<br/> system <span className='text-black'>for Mentees</span></p>
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
     <div className='flex items-start mt-5'><button onClick={()=>navigate("/contact-us")} className='p-3 text-md rounded-b-2xl rounded-l-2xl text-white bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 '>Contact Us</button></div>
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