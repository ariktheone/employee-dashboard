import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      {currentUser ? (
        <div>
          <p><strong>Name:</strong> {currentUser.displayName || 'N/A'}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <img src={currentUser.photoURL || '/path/to/default/avatar.png'} alt="Profile" />
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;