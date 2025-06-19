// components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Menu, Bell, Settings, UserCircle } from 'lucide-react';
import { getCurrentUser, logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeTab, setSidebarOpen, setActiveTab }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user when the component mounts
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // The router in App.jsx will handle the redirect
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to get the user's initials for the avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    
    if (user.displayName) {
      const names = user.displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      } else if (names.length === 1 && names[0].length > 0) {
        return names[0][0].toUpperCase();
      }
    }
    
    // If no display name, use the first letter of the email
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    
    return 'U'; // Default fallback
  };

  return (
    <header className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 shadow-sm border-b border-blue-100 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left: Menu + Title */}
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-blue-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-blue-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p className="text-sm text-blue-500">Employee Dashboard</p>
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-full bg-white hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-blue-500" />
          </button>
          <button
            className="p-2 rounded-full bg-white hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Settings"
            onClick={() => alert('Settings coming soon!')}
          >
            <Settings className="w-5 h-5 text-blue-500" />
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold text-sm shadow hover:from-blue-200 hover:to-indigo-200 transition-all"
          >
            {user?.photoURL ? (
              <div className="w-7 h-7 rounded-full border-2 border-white mr-2 overflow-hidden">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold mr-2">
                {getUserInitials()}
              </span>
            )}
            <span className="truncate max-w-[120px]">
              {user?.displayName || 'My Profile'}
            </span>
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors shadow-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;