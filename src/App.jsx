import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import VerifyEmail from './pages/VerifyEmail'
import Chat from "./pages/Chat"
import { useSelector } from 'react-redux'
import Mentor from './pages/Mentor'
import PrivateRoute from './components/Dashboard/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Profile from './components/Dashboard/profile/Profile'
import VideoCalls from './components/Dashboard/video-calls/VideoCalls'
import Room from './components/Dashboard/video-calls/Room'
import ResumePage from './pages/ResumePage'
import AfterPost from './pages/AfterPost'
import ReviewAResume from"./pages/ReviewAResume";
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Sessions from './components/Dashboard/Events/Sessions'
import TimeSlots from './components/Dashboard/Events/TimeSlots'
import PremDetails from './pages/PremDetails'
import PremiumSectionDetails from './components/premium/PremiumSectionDetails'
import Mentors from './pages/Mentors'
import Posts from './pages/Posts'
import ShowPost from './components/core/post/ShowPost'
import MyPosts from './components/core/post/MyPosts'
import Applicant from './components/Dashboard/Applications/Applicant'
import Analytics from './components/Dashboard/Analytics/Analytics'
import Users from './components/Dashboard/Analytics/Users'
import AllMentors from './components/Dashboard/Analytics/AllMentors'
import AllMentees from './components/Dashboard/Analytics/AllMentees'
import AllEvents from './components/Dashboard/Analytics/AllEvents'
import AllPosts from './components/Dashboard/Analytics/AllPosts'
import Settings from './components/Dashboard/Setting'
import CreatePremium from './components/premium/CreatePremium'
import MyMentors from './components/Dashboard/MyMentors.jsx/MyMentors'
import MyMentees from './components/Dashboard/MyMentees/MyMentees'

function App() {
  const {user} = useSelector(state=>state.profile)
  const {token} = useSelector(state=>state.auth)
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/signup','/verifyEmail'];

  return (
    <>
   {!hideNavbarRoutes.includes(location.pathname) && <Navbar/>}
    <Routes>
      <Route path='/' element={<Home/>} />
{ !token && !user &&  <>
      <Route path='/login' element={<LogIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      </>}
      <Route path='contact-us' element={<ContactUs/>} />
      <Route path='/verifyEmail' element={<VerifyEmail/>}/>
      <Route path='/create-premium' element={<CreatePremium/>}/>

      <Route path='/mentors' element={<Mentors/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/posts/:id' element={<ShowPost/>}/>
      <Route path='/myposts' element={<MyPosts/>}/>
      <Route path='/resume-post' element={<ResumePage/>}/>
      <Route path='/resume-post/submitted' element={<AfterPost/>}/>
      {/* only for mentor */}
      <Route path='/resume/review' element={<ReviewAResume/>}/>
      
      <Route path='/apply-mentor' element={<Mentor/>}/>
      <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
       <Route path='/dashboard/my-profile' element={<Profile/>}/>
       <Route path='/dashboard/video-calls' element={<VideoCalls/>}/>
       <Route path='/video-calls/:roomId' element={<Room/>}/>
       <Route path='/dashboard/sessions' element={<Sessions/>}/>
       <Route path='/dashboard/time-slots' element={<TimeSlots />}/>
       <Route path='/dashboard/chats' element={<Chat/>}/>
       <Route path='/dashboard/applications' element={<Applicant/>}/>
       <Route path='/dashboard/settings' element={<Settings/>}/>
       <Route path='/dashboard/analytics' element={<Analytics/>}/>
       <Route path='/dashboard/my-mentors' element={<MyMentors/>}/>
       <Route path='/dashboard/my-mentees' element={<MyMentees/>}/>
        <Route element={<Users/>}>
        <Route path='/dashboard/users/mentors' element={<AllMentors/>}/>
        <Route path='/dashboard/users/mentees' element={<AllMentees/>}/>
        <Route path='/dashboard/users/events' element={<AllEvents/>}/>
        <Route path='/dashboard/users/posts' element={<AllPosts/>}/>
        </Route>
      </Route>
  
        <Route path='/premium' element={<PremDetails/>}/>
        <Route path="/premium/:sectionId" element={<PremiumSectionDetails />} />

      <Route path='*' element={<Error/>}/>

    </Routes>
    </>
  )
}

export default App
