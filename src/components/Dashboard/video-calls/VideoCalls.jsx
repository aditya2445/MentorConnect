import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllSessions } from '../../../services/operations/sessionApi'
import { useSelector } from 'react-redux'

const VideoCalls = () => {
   
    const {token} = useSelector(state=>state.auth)
    const [sessions, setsessions] = useState([])
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const handleJoin = (roomId)=>{
      navigate(`/video-calls/${roomId}`)
    }

    useEffect(()=>{
    const fetchSessions = async()=>{
      setloading(true)
      const response = await getAllSessions(token)
      if(response)setsessions(response.events)
        setloading(false)
    }
  fetchSessions()
    },[])
        
    
  return (
    <div className='flex flex-col gap-y-5 mt-14 items-center justify-center w-full'>
      <div className='text-3xl font-bold mb-5'><u>Upcoming Sesions</u></div>
      {loading ? (<div className='h-[400px] flex items-center justify-center'><div className='spinner  '></div></div>): <table className='w-full'>
      <thead>
    <tr className="bg-gray-100">
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Title</th>
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Description</th>
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Mentor</th>
      <th className="px-4 py-2 text-left text-gray-600 font-bold">Time</th>
      <th className="px-4 py-2 text-center text-gray-600 font-bold">Action</th>
    </tr>
  </thead>
  <tbody>
      {
        sessions?.map((item)=>{
          const start = new Date(item.startDate)
          const end = new Date(item.endDate)
          return <tr key={item._id} className='border-b hover:bg-gray-50 transition duration-300 ease-in-out '>
           <td className="px-4 py-2">{item.title}</td>
           <td className="px-4 py-2">{item.description}</td>
           <td className="px-4 py-2">{item.mentor.firstName+" "+item.mentor.lastName}</td>
           <td className="px-4 py-2">{start.toLocaleDateString()+" "+start.toLocaleTimeString() + "-" + end.toLocaleTimeString()}</td>
           <td className="px-4 py-2 text-center"><button className={`${item.status === "Scheduled" ? "bg-yellow-300 hover:bg-yellow-400 " : item.status === "OnGoing" ? "bg-blue-600 hover:bg-blue-700 text-white " : item.status === "Completed" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600 "} text-black font-semibold py-1 px-3 rounded-lg`} onClick={()=>{if(item.status === "OnGoing")handleJoin(item.roomId)}}>{item.status === "Scheduled" ? "Scheduled" : item.status === "OnGoing" ? "Join" : item.status === "Completed" ? "Completed" : "Cancelled"}</button></td>
          </tr>
        })
      }
      </tbody>
      </table>}
    </div>
  )
}

export default VideoCalls