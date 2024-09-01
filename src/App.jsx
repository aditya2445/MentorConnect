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
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/chats' element={<Chat/>}/>
      <Route path='/resume-post' element={<ResumePage/>}/>
      <Route path='/resume-post/submitted' element={<AfterPost/>}/>
      {/* only for mentor */}
      <Route path='/resume/review' element={<ReviewAResume/>}/>
      
      <Route path='/apply-mentor' element={<Mentor/>}/>
      <Route path='*' element={<Error/>}/>
      <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
       <Route path='/dashboard/my-profile' element={<Profile/>}/>
       <Route path='/dashboard/video-calls' element={<VideoCalls/>}/>
       <Route path='/video-calls/:roomId' element={<Room/>}/>
       <Route path='/dashboard/sessions' element={<Sessions/>}/>
       { user?.accountType === "Mentor" && <Route path='/dashboard/time-slots' element={<TimeSlots/>}/>}
      </Route>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App
