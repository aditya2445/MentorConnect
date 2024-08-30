import React, { useRef, useState } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
function ResumePage() {
    const [uploading,setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    // Function to trigger the file input click event
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Function to handle file selection
    const handleFileChange = async (event) => {
        setUploading(true);
        const files = event.target.files;
        if (files.length === 0) return;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('resume', files[i]);
        }
        try {
            // Post the files to the server
            const response = await axios.post('http://localhost:3000/api/v1/resume/create', formData, {
                headers: {
                    Authorization:`Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files uploaded successfully', response.data);
            navigate("/resume-post/submitted");
        } catch (error) {
            console.error('Error uploading files', error);
        }
        setUploading(false);
    };

  return (
    <div className='border border-black min-w-fit'>
        <div className='text-2xl text-center font-serif font-semibold'>
            Review Your Resume
        </div>
        <p className='mt-[2px] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quam nemo dignissimos ducimus of ficiis commodi, magnam distinctio? Omnis doloribus eaque molestiae numquam reiciendis fugiat iste, modi quae earum? Officia, distinctio?<span className='font-bold'>Upload in JPG/PNG format</span></p>
        <div className='flex justify-center mt-2 mb-2'>
            <button onClick={handleButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded">
                {uploading == true ? "Uploading":"Upload"}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange}
                multiple // Allow multiple file selection
            />
        </div>
    </div>
  )
}

export default ResumePage
