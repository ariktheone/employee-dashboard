import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">MyApp</Link>
        <div>
          <Link to="/" className="text-gray-300 hover:text-white px-3">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white px-3">Dashboard</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white px-3">Profile</Link>
              <button onClick={logout} className="text-gray-300 hover:text-white px-3">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white px-3">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white px-3">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;