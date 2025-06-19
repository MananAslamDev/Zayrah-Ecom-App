import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Sparkles, Edit, Lock } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Fake API data
        const mockUser = {
          name: 'Demo User',
          username: 'demo',
          phoneNumber: '+1234567890',
          location: 'New York',
          profilePicture: 'https://via.placeholder.com/150',
        };

        setUser({
          name: mockUser.name,
          username: mockUser.username,
          phone: mockUser.phoneNumber,
          address: mockUser.location,
          image: mockUser.profilePicture,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Try again later.');
        setLoading(false);
        toast.error('Failed to load profile.');
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

  if (loading) {
    return (
      <div className="text-center mt-10 text-red-200 text-lg animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center mt-10 text-lg bg-red-600/30 border border-red-500/50 rounded-xl p-4 max-w-md mx-auto">
        {error}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 relative overflow-hidden min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-amber-900">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-400/10 rounded-full blur-3xl animate-pulse opacity-75" />
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-red-950/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-800/20 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-red-400/5 rounded-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl mb-4 shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-amber-300/20">
              <Sparkles className="text-red-900" size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-red-100 mb-2">
              Your Profile
            </h2>
            <p className="text-red-200/70 text-sm">Manage your account details</p>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full border-2 border-amber-400/50 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center space-x-3">
              <User className="text-amber-400" size={20} />
              <div>
                <p className="text-sm text-red-200/70">Name</p>
                <p className="text-lg font-medium text-red-100">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-amber-400" size={20} />
              <div>
                <p className="text-sm text-red-200/70">Username</p>
                <p className="text-lg font-medium text-red-100">{user.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-amber-400" size={20} />
              <div>
                <p className="text-sm text-red-200/70">Phone</p>
                <p className="text-lg font-medium text-red-100">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-amber-400" size={20} />
              <div>
                <p className="text-sm text-red-200/70">Address</p>
                <p className="text-lg font-medium text-red-100">{user.address}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-8 justify-center relative z-10">
            <button
              onClick={handleEditProfile}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-red-900 font-bold rounded-2xl px-4 py-2 hover:from-amber-300 hover:to-amber-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-amber-300/20"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleChangePassword}
              className="flex items-center space-x-2 bg-red-950/50 text-amber-400 font-bold rounded-2xl px-4 py-2 hover:bg-red-950/70 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-red-800/30"
            >
              <Lock size={16} />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-red-300/60 text-sm opacity-70 hover:opacity-100 transition-opacity duration-300">
          <p>© 2025 ZAYRAH. Crafted with excellence.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
