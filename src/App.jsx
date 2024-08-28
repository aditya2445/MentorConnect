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
import Profile from './components/Dashboard/Profile'
import VideoCalls from './components/Dashboard/VideoCalls'
import Room from './components/Dashboard/Room'


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
      <Route path='/verifyEmail' element={<VerifyEmail/>}/>
      <Route path='/chats' element={<Chat/>}/>
      <Route path='/apply-mentor' element={<Mentor/>}/>
      <Route path='*' element={<Error/>}/>
      <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
       <Route path='/dashboard/my-profile' element={<Profile/>}/>
       <Route path='/dashboard/video-calls' element={<VideoCalls/>}/>
       <Route path='/video-calls/:roomId' element={<Room/>}/>
      </Route>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App
