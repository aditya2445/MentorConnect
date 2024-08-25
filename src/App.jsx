import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import VerifyEmail from './pages/VerifyEmail'


function App() {

    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/signup','/verifyEmail'];

  return (
    <>
   {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<LogIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/verifyEmail' element={<VerifyEmail/>}/>
    </Routes>
    </>
  )
}

export default App
