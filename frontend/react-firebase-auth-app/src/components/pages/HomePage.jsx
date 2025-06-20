import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the React Firebase Auth App</h1>
      <p className="mt-4 text-lg">This is the landing page of the application.</p>
      <p className="mt-2 text-gray-600">Please log in or register to continue.</p>
    </div>
  );
};

export default HomePage;