'use client';

import React from 'react';
import { FaCoffee, FaArrowRight, FaSignInAlt, FaHome, FaMugHot, FaLeaf } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-800 via-yellow-900 to-brown-900 text-white">
      
      <header className="bg-brown-900 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold text-yellow-400">Brew Haven</h1>
          <nav className="space-x-8 flex items-center">
            <a href="#" className="text-yellow-400 hover:text-yellow-500">
              <FaCoffee className="text-2xl" /> 
            </a>
          </nav>
        </div>
      </header>

    
      <section className="flex flex-col items-center justify-center flex-grow text-center py-16 px-4 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 text-yellow-400">
            Discover the Perfect Brew
          </h1>
          <p className="text-xl mb-6 max-w-lg mx-auto text-gray-300">
            Your daily dose of handcrafted coffee and cozy ambiance awaits. Experience the finest brews at Brew Haven.
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => router.push('/register')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg flex items-center justify-center transition duration-300"
            >
              Register <FaArrowRight className="ml-2" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-gray-800 text-white hover:bg-gray-700 px-8 py-3 rounded-full text-lg flex items-center justify-center transition duration-300"
            >
              Login <FaSignInAlt className="ml-2" />
            </button>
          </div>

         
          <div className="flex justify-center space-x-8 mt-10">
            <div className="text-center">
              <FaMugHot className="text-6xl text-yellow-500 mb-4" />
              <p className="text-xl font-semibold">Premium Coffee</p>
            </div>
            <div className="text-center">
              <FaLeaf className="text-6xl text-yellow-500 mb-4" />
              <p className="text-xl font-semibold">Organic Ingredients</p>
            </div>
            <div className="text-center">
              <FaCoffee className="text-6xl text-yellow-500 mb-4" />
              <p className="text-xl font-semibold">Cozy Ambiance</p>
            </div>
          </div>
        </div>
      </section>

     
      <footer className="bg-black-1000 text-white-700 py-8"> 
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <h2 className="text-yellow-400 text-xl font-bold mb-2">Brew Haven</h2>
            <p className="text-sm">
              Your favorite spot for handcrafted coffee and comfort.
            </p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-yellow-500">Home</a></li>
              <li><a href="#" className="hover:text-yellow-500">Register</a></li>
              <li><a href="#" className="hover:text-yellow-500">Menu</a></li>
              <li><a href="#" className="hover:text-yellow-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-yellow-400 font-bold mb-2">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-yellow-500">Facebook</a>
              <a href="#" className="hover:text-yellow-500">Instagram</a>
              <a href="#" className="hover:text-yellow-500">Twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-4">
          &copy; {new Date().getFullYear()} Brew Haven. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
