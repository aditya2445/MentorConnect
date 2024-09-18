import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AcceptMentor, getAllMentorsApp, RejectMentor } from '../../../services/operations/mentorApi'

const Applicant = () => {
    const {token} = useSelector(state=>state.auth)
    const [loading, setloading] = useState(false)
    const [pendingApps, setpendingApps] = useState([])
    const [acceptedApps, setacceptedApps] = useState([])
    const [rejectedApps, setrejectedApps] = useState([])
    useEffect(()=>{
    fetchApps()
    },[])
    const fetchApps = async()=>{
        setloading(true);
        const res = await getAllMentorsApp(token);
        if(res){
            setpendingApps(res.pendingApps)
            setacceptedApps(res.AcceptedApps)
            setrejectedApps(res.RejectedApps)
            console.log(res)
        }
        setloading(false);
    }
    const acceptHandler = async(MentorId,Mentor)=>{
     setloading(true);
    const data ={...Mentor,MentorId:MentorId}
    const res = await AcceptMentor(data,token);
    fetchApps();
     setloading(false);
    }

    const rejectHandler = async(MentorId)=>{
        setloading(true);
       const res = await RejectMentor(MentorId,token);
       fetchApps();
        setloading(false);
       }
  return (
    <div className='flex flex-col my-10 gap-10 w-full items-center'>
        <h1 className='font-bold text-3xl underline'>Pending Applications</h1>
     <div className='w-full flex flex-col items-center'>
     {
        loading ? <div className='w-full h-[150px] flex items-center justify-center'><div className='spinner'></div></div> : 
        <div className='flex flex-col w-full '>
           
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
  <thead>
    <tr className="bg-gray-100">
      <td className="px-6 py-3 text-left font-semibold">Sl.No</td>
      <td className="px-6 py-3 text-left font-semibold">Name</td>
      <td className="px-6 py-3 text-left font-semibold">Categories</td>
      <td className="px-6 py-3 text-left font-semibold">Skills</td>
      <td className="px-6 py-3 text-left font-semibold">Urls</td>
      <td className="px-6 py-3 text-left font-semibold">Status</td>
    </tr>
  </thead>
  {pendingApps.length>0 ? <tbody>
    {pendingApps?.map((app, index) => {
      return (
        <tr key={app._id} className="border-t hover:bg-gray-100">
          <td className="px-6 py-4 text-gray-700">{index + 1}</td>
          <td className="px-6 py-4 text-gray-700">{app.firstName + " " + app.lastName}</td>
          <td className="px-6 py-4 text-gray-700">{app.category.name}</td>
          <td className="px-6 py-4">
            <div className="flex space-x-2">
              {app.skills
                ? JSON.parse(app.skills)
                    .slice(0, 2) // Limiting to two skills
                    .map((skill, index) => (
                      <span key={index} className="bg-green-500 text-white rounded-md px-2 py-1">
                        {skill}
                      </span> 
                    ))
                : <div>No skills found</div>
              }
            </div>
          </td>
          <td className="px-6 py-4 flex space-x-2">
            <a href={app.linkedInUrl}>
              <img
                className="h-[30px] w-[30px] rounded-full"
                src="https://imgs.search.brave.com/GpB5WQlesvec2MXDXDV3SmKb0pzSJzyH667WAzbxGcs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2NhL0xpbmtlZElu/X2xvZ29faW5pdGlh/bHMucG5n"
                alt="LinkedIn"
              />
            </a>
            <a href={app.githubUrl}>
              <img
                className="h-[30px] w-[30px] rounded-full"
                src="https://imgs.search.brave.com/zi4EFC3Ze94sTrvPrUNKSMS71oTGg9Q5FqzMa_u7Yfk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3Zjk4ZmNlZjEw/MTRjMGI1ZTQ4YzAu/cG5n"
                alt="GitHub"
              />
            </a>
          </td>
          <td className="px-6 py-4">
            <button disabled={loading} onClick={()=>acceptHandler(app._id,app)} className="rounded-md bg-green-500 text-white px-4 py-2 mr-2 hover:bg-green-600">
              Accept
            </button>
            <button disabled={loading} onClick={()=>rejectHandler(app._id)} className="rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600">
              Reject
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>: <tbody  className=''><tr className='h-[150px]'><td colSpan="6" className='px-4 py-2 text-center'>No Requests Found</td></tr></tbody>}
</table>

        </div>
     }
     </div>
      <div className='w-full flex flex-col items-center'>
      <h1 className='font-bold text-3xl underline'>Accepted Applications</h1>
     {
        loading ? <div className='w-full h-[150px] flex items-center justify-center'><div className='spinner'></div></div> : 
        <div className='flex flex-col mt-10 w-full '>
            
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
  <thead>
    <tr className="bg-gray-100">
      <td className="px-6 py-3 text-left font-semibold">Sl.No</td>
      <td className="px-6 py-3 text-left font-semibold">Name</td>
      <td className="px-6 py-3 text-left font-semibold">Categories</td>
      <td className="px-6 py-3 text-left font-semibold">Skills</td>
      <td className="px-6 py-3 text-left font-semibold">Urls</td>
      <td className="px-6 py-3 text-left font-semibold">Status</td>
    </tr>
  </thead>
  {acceptedApps.length>0 ? <tbody>
    { acceptedApps?.map((app, index) => {
      return (
        <tr key={app._id} className="border-t hover:bg-gray-100">
          <td className="px-6 py-4 text-gray-700">{index + 1}</td>
          <td className="px-6 py-4 text-gray-700">{app.firstName + " " + app.lastName}</td>
          <td className="px-6 py-4 text-gray-700">{app.category.name}</td>
          <td className="px-6 py-4">
            <div className="flex space-x-2">
              {app.skills
                ? JSON.parse(app.skills)
                    .slice(0, 2) // Limiting to two skills
                    .map((skill, index) => (
                      <span key={index} className="bg-green-500 text-white rounded-md px-2 py-1">
                        {skill}
                      </span> 
                    ))
                : <div>No skills found</div>
              }
            </div>
          </td>
          <td className="px-6 py-4 flex space-x-2">
            <a href={app.linkedInUrl}>
              <img
                className="h-[30px] w-[30px] rounded-full"
                src="https://imgs.search.brave.com/GpB5WQlesvec2MXDXDV3SmKb0pzSJzyH667WAzbxGcs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2NhL0xpbmtlZElu/X2xvZ29faW5pdGlh/bHMucG5n"
                alt="LinkedIn"
              />
            </a>
            <a href={app.githubUrl}>
              <img
                className="h-[30px] w-[30px] rounded-full"
                src="https://imgs.search.brave.com/zi4EFC3Ze94sTrvPrUNKSMS71oTGg9Q5FqzMa_u7Yfk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3Zjk4ZmNlZjEw/MTRjMGI1ZTQ4YzAu/cG5n"
                alt="GitHub"
              />
            </a>
          </td>
          <td className="px-6 py-4 text-white">
           <span className='bg-green-500 p-2 rounded-md'>Accepted</span>
          </td>
        </tr>
      );
    })}
  </tbody> :<tbody  className=''><tr className='h-[150px]'><td colSpan="6" className='px-4 py-2 text-center'>No Requests Found</td></tr></tbody>}
</table>

            
        </div>
     }
      </div>
      <div className='w-full flex flex-col items-center'>
      <h1 className='font-bold text-3xl underline'>Rejected Applications</h1>
     {
        loading ? <div className='w-full h-[150px] flex items-center justify-center'><div className='spinner'></div></div> : 
        <div className='flex flex-col mt-10 w-full '>
            
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
  <thead>
    <tr className="bg-gray-100">
      <td className="px-6 py-3 text-left font-semibold">Sl.No</td>
      <td className="px-6 py-3 text-left font-semibold">Name</td>
      <td className="px-6 py-3 text-left font-semibold">Categories</td>
      <td className="px-6 py-3 text-left font-semibold">Skills</td>
      <td className="px-6 py-3 text-left font-semibold">Urls</td>
      <td className="px-6 py-3 text-left font-semibold">Status</td>
    </tr>
  </thead>
  {rejectedApps.length>0 ? <tbody>
    {rejectedApps?.map((app, index) => {
      return (
        <tr key={app._id} className="border-t hover:bg-gray-100">
          <td className="px-6 py-4 text-gray-700">{index + 1}</td>
          <td className="px-6 py-4 text-gray-700">{app.firstName + " " + app.lastName}</td>
          <td className="px-6 py-4 text-gray-700">{app.category.name}</td>
          <td className="px-6 py-4">
            <div className="flex space-x-2">
              {app.skills
                ? JSON.parse(app.skills)
                    .slice(0, 2) // Limiting to two skills
                    .map((skill, index) => (
                      <span key={index} className="bg-green-500 text-white rounded-md px-2 py-1">
                        {skill}
                      </span> 
                    ))
                : <div>No skills found</div>
              }
            </div>
          </td>
          <td className="px-6 py-4 flex space-x-2">
            <a href={app.linkedInUrl}>
              <img
                className="h-[30px] w-[30px] rounded-full"
                src="https://imgs.search.brave.com/GpB5WQlesvec2MXDXDV3SmKb0pzSJzyH667WAzbxGcs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2NhL0xpbmtlZElu/X2xvZ29faW5pdGlh/bHMucG5n"
                alt="LinkedIn"
              />
            </a>
            <a href={app.githubUrl}>
              <img
                className="h-[30px] w-[30px] rounded-full"
                src="https://imgs.search.brave.com/zi4EFC3Ze94sTrvPrUNKSMS71oTGg9Q5FqzMa_u7Yfk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3Zjk4ZmNlZjEw/MTRjMGI1ZTQ4YzAu/cG5n"
                alt="GitHub"
              />
            </a>
          </td>
          <td className="px-6 py-4 text-white">
          <span className='bg-red-500 p-2 rounded-md'>Rejected</span>
          </td>
        </tr>
      );
    })}
  </tbody> : <tbody  className=''><tr className='h-[150px]'><td colSpan="6" className='px-4 py-2 text-center'>No Requests Found</td></tr></tbody>}
</table>   
        </div>
     }
      </div>
    </div>
  )
}

export default Applicant