import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MentorResult from '../components/core/miscellaneous/MentorResult';
import MentorDetailsCard from '../components/core/miscellaneous/MentorDetailsCard';

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const { token } = useSelector(state => state.auth);

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search.");
      return;
    }
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
    <div className='mt-4 p-4'>
      <form className='flex mb-4'>
        <input
          type="text"
          placeholder='Search by user or email'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResult?.map((user) => (
            <MentorResult
              key={user._id}
              user={user}
              handleFunction={() => setSelectedMentor(user)}
            />
          ))
        )}
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
