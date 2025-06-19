// components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  BarChart3,
  CalendarDays,
  FileText,
  MessageSquare,
  LogOut,
  X,
  Briefcase,
  Building2,
  ClipboardList,
  Wallet,
  UserPlus,
  Globe2,
  UserCircle
} from 'lucide-react';
import { getCurrentUser, logout } from '../../services/auth';

// Custom SVG Logo
const Logo = () => (
  <span className="bg-gradient-to-br from-blue-600 to-indigo-500 p-2 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center">
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#6366F1" />
      <path d="M10 20c2-4 10-4 12 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="13" cy="13" r="2" fill="#fff"/>
      <circle cx="19" cy="13" r="2" fill="#fff"/>
    </svg>
  </span>
);

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user when the component mounts
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Function to get the user's initials for the avatar
  const getUserInitials = () => {
    if (!user) return 'A';
    
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
    
    return 'A'; // Default fallback
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'clients', label: 'Clients', icon: UserPlus },
    { id: 'projects', label: 'Projects', icon: ClipboardList },
    { id: 'attendance', label: 'Attendance', icon: CalendarDays },
    { id: 'holiday', label: 'Holiday', icon: Building2 },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'consultancy', label: 'Consultancy', icon: Globe2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: UserCircle },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect is handled by the auth state change in App.jsx
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 shadow-2xl border-r border-blue-100 transition-transform duration-300 ease-in-out
        flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:transform-none`}
        style={{ position: 'fixed', left: 0, top: 0, height: '100vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 bg-white/80 border-b border-blue-100 flex-shrink-0 relative">
          <div className="flex items-center gap-3 min-w-0">
            <Logo />
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-blue-800 tracking-tight truncate max-w-[8.5rem] md:max-w-[10rem]">
                PeoplePulse
              </h1>
              <p className="text-xs text-blue-400 mt-1 font-medium truncate max-w-[8.5rem] md:max-w-[10rem]">
                HR Management Suite
              </p>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-blue-100 transition-colors" 
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-blue-400" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <nav className="px-3 py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 mb-1 text-left rounded-xl transition-all duration-200 group relative
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 scale-[1.03]'
                        : 'text-blue-700 hover:bg-blue-50 hover:shadow'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    className={`w-5 h-5 mr-3 transition-all duration-200
                      ${isActive ? 'text-white drop-shadow' : 'text-blue-400 group-hover:text-blue-600'}`} 
                  />
                  <span className={`font-medium transition-all duration-200 ${isActive ? 'text-white' : 'group-hover:text-blue-900'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info */}
        <div className="p-4 bg-white/90 border-t border-blue-100 flex-shrink-0">
          <div
            className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 transition-colors cursor-pointer mb-3 shadow"
            onClick={() => {
              setActiveTab('profile');
              setSidebarOpen(false);
            }}
          >
            {user?.photoURL ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-md">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md text-lg">
                {getUserInitials()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-blue-900 truncate">
                {user?.displayName || 'User Profile'}
              </p>
              <p className="text-xs text-blue-500 truncate">
                {user?.email || 'No email'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2.5 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 text-sm font-medium rounded-xl transition-all duration-200 shadow">
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c7d2fe;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
      `}</style>
    </>
  );
};

export default Sidebar;