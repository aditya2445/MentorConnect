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
        <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-center text-3xl font-bold mb-8">Premium Sections</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumSections.map((section) => (
                <div
                    key={section._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="p-6">
                        <div className="flex justify-center">
                            <img
                                className="w-24 h-24 rounded-full mb-4"
                                src={section.owner.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdCtAvSsrg2I9JQ2xVgmA0kZ4MY_kcFpGSA&s"}
                                alt={`${section.owner.firstName} ${section.owner.lastName}`}
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-center mb-2">
                            {section.owner.firstName} {section.owner.lastName}
                        </h2>
                        <p className="text-center text-gray-600 mb-4">Price: ${section.price}</p>
                        <span className="block text-center font-extrabold mb-2">Facilities</span>
                        <ul className="text-center font-medium text-gray-700 mb-4">
                            <li>1. Text Facility</li>
                            <li>2. One-On-One Video Call</li>
                            <li>3. Session Bookings</li>
                            <li>4. 30 Days Only</li>
                        </ul>
                        <div className="flex justify-center">
                            <button
                                className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors duration-300"
                                onClick={() => handleViewDetails(section._id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default PremiumSectionList;
