// pages/user/login.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useDispatch } from 'react-redux'; // Assuming you're using Redux for managing auth state
import { loginUser } from '@/lib/Redux/slices/userSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate login validation (replace with your auth API call)
    if (email === 'test@kiet.edu' && password === 'password') {
      dispatch(loginUser({ email })); // Dispatch Redux action to set the user state
      router.push('/user/feeds'); // Navigate to feeds after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
