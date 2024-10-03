import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-pink-500">
      <h1 className="text-4xl font-bold text-white mb-8">Hospital Management System</h1>
      <div className="bg-white p-6 rounded shadow-md w-1/3 text-center">
        <Link to="/login" className="block bg-blue-500 text-white p-2 mb-4 rounded">Login</Link>
        <Link to="/signup" className="block bg-green-500 text-white p-2 rounded">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
