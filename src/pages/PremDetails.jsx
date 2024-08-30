import React, { useEffect, useState } from 'react';
import {premium} from '../services/apis';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PremiumSectionList = () => {
    const [premiumSections, setPremiumSections] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getPremiumSections = async () => {
            const {data} = await axios.get(premium.FETCH_PREMIUMS_API);
            setPremiumSections(data.data);
        };
        getPremiumSections();
    }, []);

    const handleViewDetails = (sectionId) => {
        // Navigate to the details page with the sectionId
        navigate(`/premium/${sectionId}`);
    };

    return (
        <div>
            <h1 className='text-center font-bold'>Premium Sections</h1>
                {premiumSections.map(section => (
                    <div className='max-w-fit
                    m-auto'>
                        <div
                        key={section._id}
                        className=' bg-teal-500 font-serif border border-black flex justify-stretch rounded-lg m-2 hover:shadow-xl'
                        >
                            <div className='rounded-lg bg-gray-300 flex flex-col items-center m-2 p-2'>
                                <img 
                                className='w-[200px] h-[200px] rounded-full'
                                src={section.owner.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdCtAvSsrg2I9JQ2xVgmA0kZ4MY_kcFpGSA&s"} alt="" />
                                {section.owner.firstName + section.owner.lastName}
                            </div>
                            <div className='flex flex-col m-2 p-2 gap-3 items-center justify-center'>
                                <h2>{section.name}</h2>
                                <p>Price: ${section.price}</p>
                                <span className='font-extrabold'>Facilities</span>
                                <ul className='text-center font-bold font-serif'>
                                    <li>1.Text Facility</li>
                                    <li>2.One-One Video Call</li>
                                    <li>3.Session Bookings</li>
                                    <li>4.30 Days Only</li>
                                </ul>
                                <button 
                                className='bg-green-400 p-2 rounded-lg cursor-default hover:shadow-lg'
                                onClick={() => handleViewDetails(section._id)}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PremiumSectionList;
