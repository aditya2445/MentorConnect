import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { payment, premium } from '../../services/apis';
import axios from 'axios';
import { useSelector } from 'react-redux';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PremiumSectionDetails = () => {
  const { sectionId } = useParams(); // Extract sectionId from the URL
  const [sectionDetails, setSectionDetails] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false); // New state for purchase status
  const navigate = useNavigate(); // Initialize useNavigate
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const { data } = await axios.get(`${premium.FETCH_PREMIUMS_DETAILS}${sectionId}`);
        setSectionDetails(data.data.premiumDetails);

        // Check if the user has purchased the section
        const { data: purchaseStatus } = await axios.get(`${premium.CHECK_PURCHASE_STATUS}/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        setHasPurchased(purchaseStatus.data);
      } catch (error) {
        console.error("Failed to fetch section details", error);
      }
    };
    fetchSectionDetails();
  }, [sectionId, token]);

  useEffect(() => {
    const loadScript = async () => {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        console.error('Razorpay SDK failed to load');
      }
    };
    loadScript();
  }, []);

  const handleBuyCourse = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log("1")
        const { data } = await axios.post(`${payment.CREATE_ORDER}`, { premId: sectionId }, config);
        console.log("2")
        
        // Log the response to inspect its structure
        console.log('Payment initiation response:', data);

        // Ensure the response structure is as expected
        if (!data || !data.data) {
            throw new Error('Invalid response structure');
        }
 
        const options = {
            key: "rzp_test_KSyPcz7ikJ7jzS", // Your Razorpay Key ID
            amount: data.data.amount,
            currency: data.data.currency,
            name: "Course Payment",
            description: "Payment for course",
            order_id: data.data.id,
            handler: async (response) => {
                try {
                    await axios.post(`${payment.VERIFY}`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        premium: sectionId
                    },config);
                    // navigate('/payment-success');
                } catch (verifyError) {
                    console.error("Payment verification failed", verifyError);
                }
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error("Payment initiation failed", error);
    }
  };

  if (!sectionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mt-6">
    <h1 className="text-2xl font-bold text-center mb-4">Topic: {sectionDetails.name}</h1>
    <p className="text-gray-700 text-center mb-4">Description: {sectionDetails.description}</p>
    <p className="text-gray-700 text-center mb-4">Price: ${sectionDetails.price}</p>
    <h3 className="text-lg font-semibold text-center mb-2">Features:</h3>
    <ul className="list-disc list-inside text-gray-700 mb-4">
        {sectionDetails.features.map((feature, index) => (
            <li key={index}>{feature}</li>
        ))}
    </ul>
    <div className="flex justify-center">
        <button
            className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-colors duration-300"
            onClick={hasPurchased ? () => navigate('/explore') : handleBuyCourse}
        >
            {hasPurchased ? 'Click to Explore' : 'Proceed to Payment'}
        </button>
    </div>
</div>

  );
};

export default PremiumSectionDetails;
