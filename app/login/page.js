'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';  // Import the auth from Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';  // Firebase Authentication

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase user sign-in
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/content');  // Redirect to content page after successful login
    } catch (err) {
      setError(err.message);  // Handle error (e.g., incorrect email/password)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-800 via-yellow-900 to-brown-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/register')}
            className="text-yellow-400 hover:text-yellow-500"
          >
            Don't have an account? Register
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-yellow-400 hover:text-yellow-500"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
