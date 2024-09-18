import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MentorResult from '../components/core/miscellaneous/MentorResult';
import MentorDetailsCard from '../components/core/miscellaneous/MentorDetailsCard';
import { topMentors } from '../services/operations/mentorApi';

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const { token } = useSelector(state => state.auth);
  const [top, settop] = useState([])

  useEffect(()=>{
   const fetchAll = async()=>{
    setLoading(true);
    const res = await topMentors();
    if(res)settop(res)
      setLoading(false);
   }
   fetchAll();
  },[])
  const handleSearch = async () => {
    console.log("Reached search")
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/v1/auth/mentors?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='mt-4 p-4 w-10/12 mx-auto flex gap-5  flex-col'>
     <div className='flex flex-col gap-2'>
     <h1 className='self-start text-xl mb-2 font-semibold'>Find Your Ideal Mentor: Search by Username, Skill, Category, or Email</h1>
      <form className='flex mb-4 w-[58%] '>
        <input
          type="text"
          placeholder='Search by user or email'
          value={search}
          onChange={(e) => {setSearch(e.target.value) 
            handleSearch()}}
          className='p-2 text-sm border border-gray-300 rounded-lg w-full'
        />
        <button
          type='button'
          className='ml-2 px-4 py-2 text-white bg-green-500 rounded-lg'
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
     </div>

      <div className={`flex  p-5  items-center justify-between ${search ? "flex-row-reverse " : ""}`}>
        <div className={`${search ? "w-[40%] " : "w-[55%"} self-start `}> <h1 className='text-2xl font-bold '>Meet Our Top Mentors</h1>
          {
           top?.map((mentor)=>{
            return <div key={mentor._id}>
              <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-6 w-full m-2">
      <div className="flex items-center">
        <img
          className="w-20 h-20 rounded-full border-2 border-indigo-600"
          src={mentor?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${mentor?.firstName} ${mentor?.lastName }`}
          alt="Mentor"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">
           {mentor?.firstName+" "+mentor?.lastName}
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-lg ml-2">
              Top Mentor
            </span>
          </h2>
          <h3 className="text-gray-600 text-sm mt-1">
            Senior Software Engineer at{' '}
            <span className="text-indigo-600 font-semibold">Coinbase</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Top 1% Mentor | Interview Expert | JavaScript and React Expert | Roadmap | Pair
            Programming
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600 ml-2">(75 reviews)</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-4">
       {mentor?.about}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
       {mentor?.skills && JSON.parse(mentor?.skills)?.map((skill,index)=>{
        return  <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">{skill}</span>
       })}
     
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-2xl font-bold text-gray-900">$200/month</p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          View Profile
        </button>
      </div>
    </div>
            </div>
           })
          }
        </div>
        <div className={`flex ${search ? "" : "hidden"} self-start w-[55%] flex-col gap-6`}>
         <h1 className='text-2xl font-bold'>Search Results :</h1>
         { search ? searchResult.length === 0? (
            <div className=''>No mentors found.</div>
          ) : (
          searchResult?.map((mentor) => (
            <div key={mentor._id} className="bg-white shadow-md border border-gray-300 rounded-lg p-6 w-full">
      <div className="flex items-center">
        <img
          className="w-20 h-20 rounded-full border-2 border-indigo-600"
          src={mentor?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${mentor?.firstName} ${mentor?.lastName }`}
          alt="Mentor"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">
          {mentor?.firstName+" "+mentor?.lastName}
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-lg ml-2">
              Top Mentor
            </span>
          </h2>
          <h3 className="text-gray-600 text-sm mt-1">
            Senior Software Engineer at{' '}
            <span className="text-indigo-600 font-semibold">Coinbase</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Top 1% Mentor | Interview Expert | JavaScript and React Expert | Roadmap | Pair
            Programming
          </p>
          
        </div>
      </div>

      <p className="text-gray-600 mt-4">
       {mentor?.about}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
       {mentor?.skills && JSON.parse(mentor?.skills)?.map((skill,index)=>{
        return  <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">{skill}</span>
       })}
     
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-2xl font-bold text-gray-900">$200/month</p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          View Profile
        </button>
      </div>
    </div>
          ))
        )
        : <div>Search for a Mentor</div>}
      </div>
      </div>

      {selectedMentor && (
        <div className='mt-8'>
          <MentorDetailsCard mentor={selectedMentor} />
        </div>
      )}
    </div>
  );
}

export default Mentors;