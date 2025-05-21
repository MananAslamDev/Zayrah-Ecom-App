import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from API using axios
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        const selectedUser = response.data.users[7]; // Select first user for demo
        setUser({
          name: `${selectedUser.firstName} ${selectedUser.lastName}`,
          email: selectedUser.email,
          phone: selectedUser.phone || 'Not provided',
          address: selectedUser.address
            ? `${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.state} ${selectedUser.address.zipcode}`
            : 'Not provided',
          image: selectedUser.image || 'https://via.placeholder.com/150', // Fallback placeholder image
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEditProfile = () => {
    toast.info('Edit profile functionality coming soon!');
  };

  const handleChangePassword = () => {
    toast.info('Change password functionality coming soon!');
  };

  if (loading) return <div className="text-center mt-10 text-gray-600 text-lg">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10 text-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          <span className="border-b-4 border-[#4b0d0d] pb-1">Your Profile</span>
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-[#4b0d0d] object-cover"
          />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-lg font-medium text-gray-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="text-lg font-medium text-gray-900">{user.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="text-lg font-medium text-gray-900">{user.address}</p>
          </div>
          <div className="flex space-x-4 mt-6 justify-center">
            <button
              onClick={handleEditProfile}
              className="bg-[#4b0d0d] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#502c2c] transition-colors duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={handleChangePassword}
              className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors duration-300"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;