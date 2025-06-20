import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Award, 
  Key,
  Save,
  Upload,
  Edit2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { getCurrentUser, updateUserProfile, updateUserEmail, updateUserPassword, uploadUserAvatar } from '../../services/auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    location: '',
    position: '',
    department: '',
    joinDate: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        // For demo - we'll store these in local storage since Firebase auth doesn't have these fields
        location: localStorage.getItem('userLocation') || '',
        position: localStorage.getItem('userPosition') || 'Senior Administrator',
        department: localStorage.getItem('userDepartment') || 'Management',
        joinDate: localStorage.getItem('userJoinDate') || '2023-01-01',
        bio: localStorage.getItem('userBio') || 'Passionate about HR management and employee engagement.',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
    setLoading(false);
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await updateUserProfile({
        displayName: formData.displayName
      });

      // Store additional fields in localStorage for demo purposes
      // In a real app, these would go to a database
      localStorage.setItem('userLocation', formData.location);
      localStorage.setItem('userPosition', formData.position);
      localStorage.setItem('userDepartment', formData.department);
      localStorage.setItem('userJoinDate', formData.joinDate);
      localStorage.setItem('userBio', formData.bio);

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Update local user object
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.currentPassword) {
      setError('Please enter your current password to change email');
      return;
    }

    try {
      setLoading(true);
      await updateUserEmail(formData.email, formData.currentPassword);
      setSuccess('Email updated successfully!');
      
      // Update local user object
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
      
      // Clear sensitive fields
      setFormData({
        ...formData,
        currentPassword: '',
      });
    } catch (error) {
      console.error('Error updating email:', error);
      setError('Failed to update email. Please check your password and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await updateUserPassword(formData.currentPassword, formData.newPassword);
      setSuccess('Password updated successfully!');
      
      // Clear sensitive fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password. Please check your current password and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select an image file (JPEG, PNG, or GIF)');
      return;
    }

    try {
      setUploadingPhoto(true);
      setError('');
      await uploadUserAvatar(file);
      
      // Update local user object
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
      
      setSuccess('Profile photo updated successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError('Failed to upload photo. Please try again.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Authenticated</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          {/* Profile Header - Fixed blue gradient banner */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
            <p className="mt-2 text-blue-100">Manage your account settings and preferences</p>
            
            {/* Alert Messages */}
            {error && (
              <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center max-w-md animate-fadeIn">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center max-w-md animate-fadeIn">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}
          </div>
          
          {/* Profile Avatar - Fixed positioning */}
          <div className="flex justify-center -mt-12 mb-8 relative px-4">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-blue-300" />
                  )}
                </div>
              </div>
              
              {/* Upload button - Fixed positioning and better contrast */}
              <label 
                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md transition-all border-2 border-white"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {uploadingPhoto ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <Upload className="w-4 h-4" style={{ margin: '0 auto' }} />
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handlePhotoUpload} 
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="px-4 sm:px-8 pb-8">
            {/* Profile Information */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
                {formData.displayName || 'User'}
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isEditing ? (
                  <>
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Profile Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile Details */}
                <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    Personal Information
                  </h3>
                  
                  {isEditing ? (
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input 
                            type="text" 
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input 
                            type="tel" 
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position
                          </label>
                          <input 
                            type="text" 
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <input 
                            type="text" 
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input 
                            type="text" 
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Join Date
                          </label>
                          <input 
                            type="date" 
                            name="joinDate"
                            value={formData.joinDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea 
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button 
                          type="submit" 
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-gray-900">
                              {formData.displayName || 'Not set'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900 break-all">{formData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium text-gray-900">
                              {formData.phoneNumber || 'Not set'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">
                              {formData.location || 'Not set'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Position</p>
                            <p className="font-medium text-gray-900">
                              {formData.position || 'Not set'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Department</p>
                            <p className="font-medium text-gray-900">
                              {formData.department || 'Not set'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Join Date</p>
                            <p className="font-medium text-gray-900">
                              {formData.joinDate ? new Date(formData.joinDate).toLocaleDateString() : 'Not set'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-blue-100">
                        <p className="text-sm text-gray-500 mb-2">Bio</p>
                        <p className="text-gray-700">
                          {formData.bio || 'No bio available.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Settings */}
              <div className="space-y-6">
                {/* Email Update */}
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    Email Address
                  </h3>
                  <form onSubmit={handleUpdateEmail}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">{formData.email}</p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter password to confirm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!formData.currentPassword || loading}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {loading ? (
                        <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      ) : null}
                      Update Email
                    </button>
                  </form>
                </div>

                {/* Password Update */}
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-500" />
                    Password
                  </h3>
                  <form onSubmit={handleUpdatePassword}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input 
                        type="password" 
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword || loading}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {loading ? (
                        <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      ) : null}
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add these improved styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        
        /* Fix for mobile responsiveness */
        @media (max-width: 640px) {
          .fixed.top-4.right-4 {
            top: 1rem;
            right: 1rem;
            max-width: calc(100vw - 2rem);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;