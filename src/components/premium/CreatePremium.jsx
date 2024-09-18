import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { premium } from '../../services/apis'; // Assuming you put your endpoints in a file called apiEndpoints.js
import { useSelector } from 'react-redux';

function CreatePremium() {
  const [premiums, setPremiums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPremium, setNewPremium] = useState({
    name: '',
    description: '',
    price: '',
    features: ''
  });

  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);

  // Fetch premiums on component mount
  useEffect(() => {
    async function myPremiums() {
      try {
        const config = {
          headers: {
            Authorization:` Bearer ${token}`,
          },
        };
        const { data } = await axios.get(premium.MY_PREMIUMS, config);
        setPremiums(data.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    myPremiums();
  }, [token]);

  // Handle adding a new premium
  const handleAddPremium = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { name, description, price, features } = newPremium;
      const parsedFeatures = JSON.stringify(features.split(',')); // Convert to array

      const { data } = await axios.post(
        premium.CREATE_PREMIUM_API,
        {
          name,
          description,
          price,
          features: parsedFeatures,
        },
        config
      );

      setPremiums([...premiums, data.data]); // Update the list with new premium
      setNewPremium({ name: '', description: '', price: '', features: '' }); // Reset form
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error adding premium:", error);
    }
  };

  return (
    <div className="relative">
      {/* Add Premium Button */}
      <button
        className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        Add Premium
      </button>

      <h1 className="text-center text-2xl font-bold">Manage Premiums</h1>

      {/* List of Premiums */}
      <div className="flex flex-col gap-4 mt-6">
        {premiums.length > 0 ? (
          premiums.map((premium, index) => (
            <div
              key={index}
              className="mx-auto w-5/12 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mt-4 flex flex-col gap-2 items-center"
            >
              <h1 className="text-2xl font-serif font-bold text-center">
                Topic: {premium?.name}
              </h1>
              <p className="text-gray-700">Description: {premium?.description}</p>
              <div className="flex justify-between">
                <div className="text-gray-700">Price: ${premium?.price}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No premiums available.</p>
        )}
      </div>

      {/* Modal for Adding New Premium */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Premium</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPremium();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newPremium.name}
                  onChange={(e) =>
                    setNewPremium({ ...newPremium, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  className="border p-2 w-full"
                  value={newPremium.description}
                  onChange={(e) =>
                    setNewPremium({ ...newPremium, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Price:</label>
                <input
                  type="number"
                  className="border p-2 w-full"
                  value={newPremium.price}
                  onChange={(e) =>
                    setNewPremium({ ...newPremium, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Features (comma-separated):</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={newPremium.features}
                  onChange={(e) =>
                    setNewPremium({ ...newPremium, features: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Premium
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePremium;