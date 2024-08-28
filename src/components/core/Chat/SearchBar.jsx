import React, { useState } from 'react'

function SearchBar({onSearch}) {
    const [searchItem,setSearchItem] = useState('');
    const handleInputChange=(e)=>{
        setSearchItem(e.target.value);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSearch(searchItem);
    }
  return (
    <div className='w-[100%] flex justify-center items-center flex-wrap mt-[20px]'>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder='Search Here'
            value={searchItem}
            onChange={handleInputChange}
            className='p-2 text-sm border border-black rounded-lg'
        />
      </form>
        <button type='submit' className='px-2 py-2 font-sans text-sm w-10 bg-green-400 min-w-fit rounded-md'>Search</button>
    </div>
  )
}

export default SearchBar
