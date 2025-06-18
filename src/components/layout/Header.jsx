// components/layout/Header.jsx
import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';

const Header = ({ activeTab, setSidebarOpen }) => {
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
            <Menu className="w-6 h-6 text-blue-600" />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 capitalize tracking-tight drop-shadow-sm transition-all">
              {activeTab}
            </h2>
            <p className="text-sm text-blue-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          <button
            className="relative p-2 rounded-full bg-white hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Notifications"
            onClick={() => alert('Notifications coming soon!')}
          >
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button
            className="p-2 rounded-full bg-white hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Settings"
            onClick={() => alert('Settings coming soon!')}
          >
            <Settings className="w-5 h-5 text-blue-500" />
          </button>
          <div className="hidden md:flex items-center ml-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold text-sm shadow">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold mr-2">A</span>
            Admin
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;